import Vue from 'vue'

export default Vue.filter('pwdlevel', function (string) {
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
})