(function (window) {
	var util = {
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
			return parametersObj[parameter];
		},
		//URL去除哈希值
		getUrlExceptHash: function(){
			var href = window.location.href, hash = window.location.hash;
			return hash ? href.substr(0, href.indexOf(hash)) : href;
		},
		//异步加载数据
		getMyrequest: function(data) {
			var deferred = $.Deferred();				
			
			$.ajax({
				type: data.type,
				dataType: 'json',
				url: data.url + '?_t=' + (+new Date()),
				data: data.param
			})
			.done(function (resp) {
				if (resp.success === true) {
					deferred.resolve(resp);
				} else {
					deferred.reject(resp);
				}
			})
			.fail(function (resp) {
				deferred.reject(resp);
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
	  }
	}

	util = window.util || util;
})(window)