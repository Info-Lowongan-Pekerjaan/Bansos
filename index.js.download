
var idn = '/static/js/locale/idn.js'
var en_us = '/static/js/locale/en_us.js'
var vi = '/static/js/locale/vi.js'
var spanish = '/static/js/locale/spanish.js'
var russian = '/static/js/locale/russian.js'
var portuguese = '/static/js/locale/portuguese.js'
var thailand = '/static/js/locale/thailand.js'
var arabic = '/static/js/locale/arabic.js'
var filipino = '/static/js/locale/filipino.js'
var turkey = '/static/js/locale/turkey.js'

var init = false

// 图片域名
var wwwhost = 'https://www.happywifis.com';
if(location.host.indexOf('webtest') > -1){
    wwwhost = 'https://wwwtest.happywifis.com'
}
window.wwwhost = wwwhost
window.imgPath = wwwhost+'/activity/locales_imgs'

var loadLocale = function(callback, language){
    if(callback){
        this.callback = callback;
    }
    if(getQueryString('language')){
        language = getQueryString('language')
    }
    if(!init && !language){
        return callGetAppLanguage();
    }
    var lang = language || getStoregeDaga('local_locale')
    var url = '';
    /**
     * 1 菲律宾 2 越南 3 印尼 4 西班牙 5 墨西哥 6哥伦比亚 7 根廷 8 秘鲁 9内瑞拉 10 '美国（英文）  11  新加坡（英文）  12 马来西亚（英文） 13 巴西（葡萄牙语） 14 俄罗斯 15中文 17泰语
     * 18尼日利亚（英文） 19沙特阿拉伯（阿拉伯语） 20埃及（阿拉伯语） 21阿联酋（阿拉伯语）22菲律宾 23土耳其
    */
    lang = parseInt(lang)

    switch(lang){
        case 0:
        case 10:
        case 11:
        case 12:
        case 18:
        case 1: url = en_us; break;
        case 2: url = vi; break;
        case 3: url = idn; break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9: url = spanish; break;
        case 13: url = portuguese; break;
        case 14: url = russian; break;
        case 17: url = thailand; break;
        case 19:
        case 20:
        case 21: 
            url = arabic;
            // 添加样式
            $('body').css('direction', 'rtl')
            $('#app').addClass('arabic')
        break;
        case 22: url = filipino; break;
        case 23: url = turkey; break;
        default:
            url = en_us;
    }

    url += '?t='+Date.now();
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
    script.addEventListener('load', ev => {
        this.callback && this.callback(locale, lang)
    });
}

// currency_location: 符号在前  1 符号在后
var moneyConfig = [
    { id: 0, money_emoji: '$', currency_location: 0, title: '非地区（英文）' },
    { id: 1, money_emoji: '₱', currency_location: 0, title: '菲律宾/英' },
    { id: 2, money_emoji: '₫', currency_location: 1, title: '越南' },
    { id: 3, money_emoji: 'Rp', currency_location: 0, title: '印尼' },
    { id: 4, money_emoji: '$', currency_location: 0, title: '西班牙' },
    { id: 5, money_emoji: '$', currency_location: 0, title: '墨西哥' },
    { id: 6, money_emoji: '$', currency_location: 0, title: '哥伦比亚' },
    { id: 7, money_emoji: '$', currency_location: 0, title: '阿根廷' },
    { id: 8, money_emoji: '$', currency_location: 0, title: '秘鲁' },
    { id: 9, money_emoji: '$', currency_location: 0, title: '委内瑞拉' },
    { id: 10, money_emoji: '$', currency_location: 0, title: '美国（英文）' },
    { id: 11, money_emoji: '$', currency_location: 0, title: '新加坡（英文）' },
    { id: 12, money_emoji: '$', currency_location: 0, title: '马来西亚（英文）' },
    { id: 13, money_emoji: 'R$', currency_location: 0, title: '巴西（葡萄牙语）' },
    { id: 14, money_emoji: '₽', currency_location: 1, title: '俄罗斯' },
    { id: 15, money_emoji: '￥', currency_location: 0, title: '中国' },
    { id: 17, money_emoji: '₦', currency_location: 0, title: '尼日利亚（英文）' },
    { id: 18, money_emoji: '$', currency_location: 0, title: '沙特阿拉伯（阿拉伯语）' },
    { id: 19, money_emoji: '$', currency_location: 0, title: '埃及（阿拉伯语）' },
    { id: 20, money_emoji: 'د.إ', currency_location: 0, title: '阿联酋（阿拉伯语）' },
]
// 获取货币配置
function getUserMoneyConfig(language){
    var result = moneyConfig[0]
    moneyConfig.map(function(d){
        if(d.id == language){
            result = d;
        }
    })
    return result;
}

function toLoadLocale(lang, version){
    if(lang){
        setStoregeDaga('local_locale', lang)
        setStoregeDaga('version', version)
    }
    loadLocale();
}

// 获取app语言设置
function callGetAppLanguage() {
    init = true;
    if(!window.webkit && !window.happywifi){
        toLoadLocale();
        return;
    }
    try {
        if (isIos()) {
            window.webkit.messageHandlers.callGetAppLanguage.postMessage('toLoadLocale');
        } else {
            window.happywifi.callGetAppLanguage('toLoadLocale');
        }
    } catch (error) {
        toLoadLocale('3', '2.0.0');
    }
}

// 判断设备为 ios
function isIos() {
    var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
    }
    return false;
}

function setStoregeDaga(key, value){
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        
    }
}

function getStoregeDaga(key){
    try {
        return localStorage.getItem(key)
    } catch (error) {
        return null
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str = location.href.split('?')[1] || '';
    var r = str.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
