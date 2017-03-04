import $ from 'jquery'
export default function UploadFile (opt) {
	this.init(opt)
}

UploadFile.prototype = {
	//	配置参数
	default: {
		uploadRootClass: '.upload',
		uploadUrl: '',
		allowSize: 5,     //		上传大小限制  默认5M
		uploadStart: function () {},
		uploadProgress: function () {},
		uploadSuccess: function () {},
		uploadFail: function () {}
	},
	init: function (opt) {
		this.cfg = $.extend({}, this.default, opt)
		this.cfg.elIndex = 0   //	记录DOM索引
		this.cfg.xhrObj = {}	 //	上传对象缓存							  
		
		this.bindEvt()
	},

	bindEvt: function () {
		var self = this
		var input = $(this.cfg.uploadRootClass).find('input[type="file"]')
		$('body').on('change', input, function (e) {
			var el = e.target
			var rootEl = $(el).closest(self.cfg.uploadRootClass)
			self.cfg.elIndex++
			var files = e.target.files
			var file = files[0]
			//console.log(file)
			//	创建新的上传控件
			var eleClone = $(el).clone()
			rootEl.prepend(eleClone)
			$(el).remove()

			//	检查文件大小
			if (!self.checkSize(file)) {
				return
			}
			
			//	拼接DOM
			self.rednderUI(file, rootEl, self.checkType(file), self.cfg.elIndex)

			//	上传
			self.upload(file, rootEl, self.cfg.elIndex)
		})

		//	删除
		this.delete()
	},

	//	判断上传文件类型
	checkType: function (file) {
		if (/image\/\w+/.test(file.type)) {
			return 'img'
		} else {
			return 'file'
		}
	},
	//	检查文件大小
	checkSize: function (file) {
		var size = file.size
		var maxSize = this.allowSize * 1024 * 1024
		//console.log(size)
		if (size > maxSize) {
			alert('文件超过大小，请重新选择')
			return false
		}
		return true
	},

	//	上传
	upload: function (file, rootEl, elIndex) {
		if (!this.cfg.uploadUrl) {
			return
		}
	
		var self = this
		var xhr = new XMLHttpRequest()
		var fd = new FormData()

		fd.append('name', 'Html 5 File API/FormData')
		fd.append('file', file)

		//	上传开始
		xhr.onloadstart = function (e) {
			self.uploadStart(e, xhr, rootEl, elIndex)
		}

		//	上传结束
		xhr.onload = function (e) {
			self.uploadComplete(e, xhr, file, rootEl, elIndex)
		}

		//	上传进度
		xhr.upload.onprogress = function (e) {
			if (e.lengthComputable) {
				self.uploadProgress(e, xhr, rootEl, self.checkType(file), elIndex)
			} 
		}

		//上传失败
		xhr.onerror = function (e) {
			self.cfg.uploadFail(e, xhr)
			xhr.abort();	//取消上传
		}

		

		xhr.open('post', this.cfg.uploadUrl)
		xhr.send(fd)
	},
	//	上传开始
	uploadStart: function (e, xhr, rootEl, elIndex) {
		this.cfg.uploadStart(e, xhr, rootEl)
		this.cfg.xhrObj[elIndex.toString()] = xhr
	},

	//	上传结束
	uploadComplete: function (e, xhr, file, rootEl, elIndex) {
		if (xhr.status === 200 || xhr.status === 304) {
			var resp = JSON.parse(xhr.responseText)
			var fileInfo = this._getFileInfo(file)

			//	上传成功
			if (resp && resp.optSuc === true) {
				this.cfg.uploadSuccess(fileInfo)
				this.uploadSuccess(file, rootEl, this.checkType(file), elIndex)
			}
			//	上传失败
			else {
				this.uploadFail(e, xhr, resp, rootEl, elIndex)
			}
		}
		//	上传失败
		else {
			this.uploadFail(e, xhr, resp, rootEl, elIndex)
		}

		this.cfg.xhrObj[elIndex.toString()] = null
	},

	//	上传进度
	uploadProgress: function (e, xhr, rootEl, type, elIndex) {
		if (!rootEl) {
			return
		}
		this.cfg.uploadProgress.call(this, e.loaded, e.total)
		var renderContainer = $('#uploadFile' + elIndex)
		var progressEl = renderContainer.find('.status')
		var progressNum = ((e.loaded / e.total) * 100).toFixed()
		var progress = progressNum + '%'

		//	显示进度 数值
		progressEl.html(progress)

		if (type === 'file') {
			//	设置进度条
			var progressBar = renderContainer.find('.progress_bar_container')
			if (!progressBar.length) {
				return
			}
			var w = Number(progressBar.css('width').replace('px', '')) * progressNum / 100
			progressBar.find('p').css({
				width: w + 'px'
			})
		}
	},

	//	上传成功
	uploadSuccess: function (file, rootEl, type, elIndex) {
		var renderContainer = $('#uploadFile' + elIndex)
		//	如果是图片
		if (type === 'img') {
			//	隐藏进度条
			renderContainer.find('.status').css({
				display: 'none'
			})
		
			var url = window.URL.createObjectURL(file)
			var img = '<img src="'+ url +'">'
			renderContainer.find('.mask').css({
				'display': 'none'
			})
			renderContainer.find('.img_frame').append(img)
		}
		//	文件
		else {
			renderContainer.find('.status').html('上传成功')
		}

	},

	// 上传失败
	uploadFail: function (e, xhr, resp, rootEl, elIndex) {
		this.cfg.uploadFail(e, xhr, resp)
		var renderContainer = $('#uploadFile' + elIndex)
		renderContainer.find('.status').html('上传失败')
		renderContainer.find('.delete').css({
			'display': 'inline-block'
		})
	},

	//	删除
	delete: function () {
		var el = $(this.cfg.uploadRootClass)
		var self = this
		$(el).on('click', '.delete', function (e) {
			e.stopPropagation()
			var target = e.target
			var index = $(target).closest('.upload_container').attr('index')

			self.destory(target)
			self.cancelRequest(index)
		})
	},

	//	取消请求
	cancelRequest: function (index) {
		//	存在请求终止
		if (this.cfg.xhrObj[index.toString()]) {
			this.cfg.xhrObj[index.toString()].abort()
			this.cfg.xhrObj[index.toString()] = null
		}
	},

	destory: function (el) {
		$(el).off().closest('.upload_container').remove()
	},

	//	包装上传图片信息
	_getFileInfo (file) {
		var fileInfo = {
			name: file.name,
			size: file.size
		}
		return fileInfo
	},

	//	生成文件DOM
	rednderUI: function (file, el, type, elIndex) {
		//el.find('.upload_container').remove()
		var html = ''
		if (type === 'img') {
			html = [
				'<div class="upload_img_container upload_container" id="uploadFile'+ elIndex +'" type="img" index="'+ elIndex +'">',
					'<div class="mask"></div>',
					'<div class="img_frame">',
						'<span href="javascript:;" class="delete">ｘ</span>',
						'<p class="status">0%</p>',
					'</div>',
					'<div class="name">'+ file.name +'</div>',
				'</div>'
			].join('')
		} else {
			html = [
				'<div class="upload_file_container upload_container clearfix" id="uploadFile'+ elIndex +'" type="file" index="'+ elIndex +'">',
				  '<div class="left fl">',
				    '<h2><i>'+ file.name +'</i></h2>',
				    '<div class="clearfix bottom">',
				      '<div class="progress_bar_container fl">',
				        '<p></p>',
				      '</div>',
				      '<span class="status fl">0%</span>',
				    '</div>',
				  '</div>',
				  '<div class="right delete fr">ｘ</div>',
				'</div>'
			].join('')
		}

		el.append(html)
	}
}