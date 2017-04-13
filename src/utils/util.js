import $ from 'jquery'
import configUrl from '../data/configUrl'

const util = {
	//获取url参数
	getURLParameters: function(parameter){
		var parameters = window.location.search;
		var parametersObj = {};
		if(parameters.indexOf('?') > -1){
			var str = parameters.substr(1);
				str = str.split('&');
			for(var i = 0;i < str.length;i ++){
				parametersObj[str[i].split('=')[0]] = decodeURIComponent(str[i].split('=')[1]);
			}
		}
    console.log(window.location.search)
		return parametersObj[parameter];
	},
	//URL去除哈希值
	getUrlExceptHash: function(){
		var href = window.location.href, hash = window.location.hash;
		return hash ? href.substr(0, href.indexOf(hash)) : href;
	},
	//异步加载数据
	getMyrequest: function(opt) {
		var deferred = $.Deferred();				
		opt.data = typeof opt.data === 'undefined' ? {} : opt.data;
		$.ajax({
			type: opt.type,
			dataType: 'json',
			url: opt.url,
      async: opt.async || true,
			data: opt.data
		})
		.done(function (resp) {
			if (resp.success === true) {
				deferred.resolve(resp);
				opt.success(resp)
			} else {
				deferred.reject(resp);
				opt.fail(resp)
			}
		})
		.fail(function (resp) {
			deferred.reject(resp);
			opt.fail(resp)
		});
		
		return deferred.promise();
	},
	//异步提交复杂数据
	getMyCompRequest: function(opt) {
		var deferred = $.Deferred();				
		opt.data = typeof opt.data === 'undefined' ? {} : opt.data;
		$.ajax({
			type: opt.type,
			dataType: 'json',
			url: opt.url + '?_t=' + (+new Date()),
			data: JSON.stringify(opt.data),
			contentType: "application/json; charset=utf-8"
		})
		.done(function (resp) {
			if (resp.success === true) {
				deferred.resolve(resp);
				opt.success(resp)
			} else {
				deferred.reject(resp);
				opt.fail(resp)
			}
		})
		.fail(function (resp) {
			deferred.reject(resp);
			opt.fail(resp)
		});
		
		return deferred.promise();
	},
	//转义特殊字符<,>,",'
	escapeToHtmlEntity: function (str) {
		if (!str) {
			return '';
		}

		var escape = {
			'<': '&lt;',
			'>': '&gt;',
			'\"': '&quot;',
			'&': '&amp;'
		};

		return str.replace(/[&<>"]/g, function (match) {
			return escape[match] || match;
		});
	},

  //转义特殊字符<,>,",'
  unEscapeToHtmlEntity: function (str) {
      if (!str) {
          return '';
      }

      str = str.replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '\"')
              .replace(/&amp;/g, '&')
              .replace(/&nbsp;/g, ' ')
              .replace(/<br>/g, '\n');

      return str;
  },
  //	延迟函数
  delay: function (time, callBack) {
  	setTimeout(function () {
  		callBack && callBack();
  	}, time)
  },
  diffTime: function(start, end) {
  	var start = new Date(start),
  		end = new Date(end);
	var diff = end.getTime() - start.getTime();
	var days=Math.floor(diff/(24*3600*1000));  
       
    //计算出小时数  
    var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数  
    var hours=Math.floor(leave1/(3600*1000));  
    //计算相差分钟数  
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数  
    var minutes=Math.floor(leave2/(60*1000));  
       
    //计算相差秒数  
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数  
    var seconds=Math.round(leave3/1000);  
      
    var returnStr = "";  
    if(minutes>0) {  
        returnStr = minutes + "分" + returnStr;  
    }  
    if(hours>0) {  
        returnStr = hours + "小时" + returnStr;  
    }  
    if(days>0) {  
        returnStr = days + "天" + returnStr;  
    }  
    return returnStr;
  }, 
  //	选择日期 将2016-09-09转换成new Date()格式
  selectDateFormat: function (date, sep) {
  	date = date.split(sep);
  	var y = Number(date[0]),
  			m = Number(date[1]) - 1,
  			d = Number(date[2]);
  	return new Date(y, m, d)
  },
  //	设置日期
  setDate: function (num, date) {
  	date = typeof date === 'undefined' ? new Date() : date;
  	var y = date.getFullYear(),
  			m = date.getMonth(),
  			d = date.getDate() + num;

  	var dd = new Date(y, m, d);
  			
		y = dd.getFullYear();
		m = dd.getMonth() + 1;
		d = dd.getDate();
  	m = m > 9 ? m : '0' + m;
  	d = d > 9 ? d : '0' + d;
  	return y + '-' + m + '-' + d;
  },

  //	根据日期获取天数
  getDays: function (start, end, sep) {
  	var dd = end.split(sep),
  			y = Number(dd[0]),
  			m = Number(dd[1] - 1),
  			d = Number(dd[2]);
  	end = +new Date(y, m, d);
  	dd = start.split(sep);
  	y = Number(dd[0]);
  	m = Number(dd[1] - 1);
  	d = Number(dd[2]);
  	start = +new Date(y, m, d)

  	return Math.floor((end - start) / 1000 / (24 * 60 * 60))
  },

  //	上传文件
  fileUpload: function (el, parentStr) {
    var deferred = $.Deferred();
  	var file = el.files[0]
  	if ( file.size > 5 * 1024 * 1024) {
  		alert('文件必须小于5M')
  		return
  	}
  	var parent = $(el).closest(parentStr)
  	var form = $(el).closest('form')[0]
  	var formdata = new FormData(form)
  	formdata.append('name', 'Html 5 File API/FormData');
  	var self = this
  	$.ajax({
  	    type: 'POST',
  	    url: configUrl.fileUpload.dataUrl,
  	    data: formdata,
  	    xhr: function () {
  	    	var myXhr = $.ajaxSettings.xhr()
	    		myXhr.upload.addEventListener('progress', function (e) {
	    			console.log(e)
	    		}, false)
  	    	return myXhr
  	    },
  	    success: function (data) {
  	        if (data.optSuc === true) {                
  	        		self.showFile(file, parent, '上传成功')                
                deferred.resolve(data);
  	        } else {
  	            self.showFile(file, parent, '上传失败')
  	        }
  	    },
  	    fail: function (data) {
  	        self.showFile(file, parent, '上传失败')
  	    },
  	    processData: false,  
  	    contentType: false
  	})
    return deferred.promise();
  },

  //显示文件
  showFile: function (file, el, status) {
  	if (file.type === 'image/jpeg' || file.type === 'image/png') {
  		var url = window.URL.createObjectURL(file)
      console.log(file)
  		var div = el.find('.file_upload_img_container');
  		var html = '<div class="file_upload_img_wrapper"><img class="upload_img" src="'+ url +'"><span id="upload_delete">ｘ</span><p>'+ status +'</p></div>';
  		if (!div.length) {
  			div =  document.createElement('div')
  			div.className = 'file_upload_img_container file_upload_container'
  			el.append(div)
  			div.innerHTML = html
  		} else {
  			div.html(html)
  		}
  	} else {
  		var div = el.find('.file_upload_container');
  		var html = '<div class="file_upload_wrapper">'+ file.name +'<span id="upload_delete">ｘ</span></div><p>'+ status +'</p>'
  		if (!div.length) {
  			div =  document.createElement('div')
  			div.className = 'file_upload_container'
  			el.append(div)
  			div.innerHTML = html
  		} else {
  			div.html(html)
  		}
  	}

  	//	文件删除
  	$('.upload-box').on('click', '#upload_delete', function () {
  		$(this).closest('.file_upload_container').remove()
  	})
  },
  // 异步提交文件
	ajaxFileUpload: function(opt) {
		var deferred = $.Deferred();				
		var data = new FormData();
		data = data.append("file", opt.data);   
		console.log(data)
		// opt.data = typeof opt.data === 'undefined' ? {} : opt.data;
		$.ajax({
			type: opt.type,
			url: opt.url + '?_t=' + (+new Date()),
			data: data,
			cache: false,
			processData: false,
			contentType: false
		})
		.done(function (resp) {
			if (resp.optSuc === true) {
				deferred.resolve(resp);
				opt.success(resp)
			} else {
				deferred.reject(resp);
				opt.fail(resp)
			}
		})
		.fail(function (resp) {
			deferred.reject(resp);
			opt.fail(resp)
		});
		
		return deferred.promise();
	},
  //替换指定传入参数的值,paramName为参数,replaceWith为新值  
  replaceParamVal: function (url, paramName, replaceWith) {  
      //var oUrl = window.location.href.toString();  
      var re = eval('/('+ paramName+'=)([^&]*)/gi');  
      var nUrl = url.replace(re,paramName+'='+replaceWith);  
      return nUrl
  },
  getPwdLevel: function (string) {
    if(!string){
        return 1
    }
    if(string.length >=6) {
        if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)) {
            return 3;
        }else if(/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string) || /\W+\D+/.test(string)) {
            if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
                return 2;
            }else if(/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
                return 2;
            }else if(/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
                return 2;
            }else{
                return 1;
            }
        }
    }else{
        return 1; 
    }
  },

  //  获取页面根路劲
  getRootPath: function () {
      //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
      var curWwwPath = window.document.location.href;
      //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
      var pathName = window.document.location.pathname;
      var pos = curWwwPath.indexOf(pathName);
      //获取主机地址，如： http://localhost:8083
      return curWwwPath.substring(0, pos);
  }
}

module.exports = util

