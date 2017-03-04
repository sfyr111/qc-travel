import Vue from 'vue'

export default Vue.filter('dateformat', function (value, fmt) {
    if(!value || !fmt){
        return value
    }

	var year, month, date, hour, minute, second, day,
        reg, rule, afterFormat;

    var dateTime = new Date(value);

    if (!fmt) {
        return dateTime.getTime();
    }

    year = dateTime.getFullYear();
    month = dateTime.getMonth() + 1;
    date = dateTime.getDate();
    hour = dateTime.getHours();
    minute = dateTime.getMinutes();
    second = dateTime.getSeconds();
    day = dateTime.getDay();
    
    var dayObj = {
        '0': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六'
    };

    rule = {
        'yy': year - 2000,
        'yyyy': year,
        'M': month,
        'MM': month < 10 ? '0' + month : month,
        'd': date,
        'dd': date < 10 ? '0' + date : date,
        'h': hour,
        'hh': hour < 10 ? '0' + hour : hour,
        'm': minute,
        'mm': minute < 10 ? '0' + minute : minute,
        's': second,
        'ss': second < 10 ? '0' + second : second,
        'w': '星期' + dayObj[day]
    };

    reg = /y{2,4}|M{1,2}|d{1,2}|h{1,2}|m{1,2}|s{1,2}|w/g;

    afterFormat = fmt.replace(reg, function($) {
        if ($ in rule) {
            return rule[$];
        } else {
            return $;
        }
    });

    return afterFormat;
})