import Taro from '@tarojs/taro'

//生成Peerid   每个设备只生成一次，清除缓存重新生成
export var createPeerid = () => {
    let ts = (new Date()).getTime()
    let rn = Math.floor(Math.random() * 9) + 1;
    let mn = ts % rn
    let first = '3'
    return first + getRandomString(3, false, true) + rn + ts.toString(36) + mn + getRandomString(6, false, true);
};

export function getRandomString(len, onlyNumber, isLowercase) {
    len = len || 32;
    var chars = "0123456789abcdefghigklmnopqrstuvtxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
    var size = onlyNumber
        ? 10
        : 62;
    var str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * size));
    }
    if (isLowercase) {
        str = str.toLowerCase();
    }
    return str;
}

export var initPeerid: Function = () => {
    var peerid = myStorage.get("peerid");
    if (!peerid) {
        peerid = createPeerid();
        // Taro.setStorageSync('peerid', peerid)

        myStorage.set("peerid", peerid)
    }
    return peerid;
}

export var initSessionid: Function = () => {
    var sessionid = myStorage.get("sessionid");
    if (!sessionid) {
        sessionid = '';
    }
    return sessionid;
}

var mapSort = (data, size) => {
    let objKeyChange = {}
    let resultData: any = []
    let objVal: any = []
    let objKeys = Object.keys(data)

    if (!size) {
        size = objKeys.length
    }
    objKeys.map(e => {
        objKeyChange[data[e]] = e
        objVal.push(data[e])
    })

    objVal.sort((a, b) => {
        return b - a
    }).splice(0, size)
        .map(e => {
            resultData.push(objKeyChange[e])
        })
    return resultData
}
export var getBookbagStatTop = () => {
    var topData = {
        bagid: [],
        type: [],
        age: []
    };
    var bookbagStat = myStorage.get("bookbagStat");
    if (!bookbagStat) {
        return topData;
    }
    if (bookbagStat.bagid) {
        topData.bagid = mapSort(bookbagStat.bagid, 5);
    }
    if (bookbagStat.type) {
        topData.type = mapSort(bookbagStat.type, 2);
    }
    if (bookbagStat.age) {
        topData.age = mapSort(bookbagStat.age, 2);
    }
    return topData;
}

export var updateBookbagStat = (bookbag) => {
    var bookbagStat = myStorage.get("bookbagStat");
    if (!bookbagStat) {
        bookbagStat = {
            bagid: {},
            type: {},
            age: {}
        };
    }
    if (bookbagStat.bagid[bookbag.bagid]) {
        bookbagStat.bagid[bookbag.bagid] = bookbagStat.bagid[bookbag.bagid] + 1;
    } else {
        bookbagStat.bagid[bookbag.bagid] = 1;
    }
    if (bookbagStat.type[bookbag.type]) {
        bookbagStat.type[bookbag.type] = bookbagStat.type[bookbag.type] + 1;
    } else {
        bookbagStat.type[bookbag.type] = 1;
    }
    if (bookbagStat.age[bookbag.age]) {
        bookbagStat.age[bookbag.age] = bookbagStat.age[bookbag.age] + 1;
    } else {
        bookbagStat.age[bookbag.age] = 1;
    }
    // Taro.setStorageSync("bookbagStat", bookbagStat)
    myStorage.set("bookbagStat", bookbagStat)
}

//金钱格式
export var formatMoney: Function = num => {
    if (num.length == 0) {
        return "0.00";
    } else if (num.length == 1) {
        return "0.0" + num;
    }
    if (num.length == 2) {
        return "0." + num;
    }
    return num.substring(0, num.length - 2) + "." + num.substring(num.length - 2);
};
// 随机数
export var getRandomNumber: Function = (Min, Max) => {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
};







export var isH5: Function = () => {
    var state = false;
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        state = true;
    }
    return state;
}

export var isWxapp: Function = () => {
    var state = false;
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        state = true;
    }
    return state;
}


//获取二维码后的参数
export var getCodeString = (url, name) => {
    var us = "?" + url.split("?")[1];
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = us.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
export var datedifference: Function = (sDate1, sDate2) => {
    if (!sDate1)
        return ''
    if (sDate1 && !sDate2) {
        sDate2 = new Date()
    }
    let dateSpan,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays + 1
}

export var getUrlParam: Function = (url) => {
    var htmlHref = url;
    htmlHref = htmlHref.replace(/^http:\/\/[^/]+/, "");
    var addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1);
    var index = addr.lastIndexOf("\/");
    //js 获取字符串中最后一个斜杠后面的内容
    var addrLast = decodeURI(addr.substring(index + 1, addr.length));
    //js 获取字符串中最后一个斜杠前面的内容
    var addrPrve = decodeURI(addr.substring(0, index));
    return { addrLast, addrPrve }
}



//数据存储
export var myStorage = {
    set(key, stringVal, time = 60000000000000) {
        try {
            var newTime: any = new Date()
            var cacheExpireDate = (newTime - 1) + time * 1000;
            var cacheVal = {
                val: stringVal,
                exp: cacheExpireDate
            };
            Taro.setStorageSync(key, JSON.stringify(cacheVal));
        } catch (e) { }
    },
    /**获取缓存*/
    get(key) {
        try {
            var cacheVal = Taro.getStorageSync(key);
            var result = JSON.parse(cacheVal);
            var newTime: any = new Date()
            var now = newTime - 1;
            if (!result) {
                return null;
            } //缓存不存在  
            if (now > result.exp) { //缓存过期  
                Taro.removeStorageSync(key);
                return "";
            }
            return result.val;
        } catch (e) {
            Taro.removeStorageSync(key);
            return null;
        }
    },
    /**移除缓存，一般情况不手动调用，缓存过期自动调用*/
    remove(key) {
        Taro.removeStorageSync(key);
    },
    /**清空所有缓存*/
    clear() {
        Taro.clearStorageSync()
    }
}

//星座
export var getAstro: Function = (month, day) => {
    var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}


export var dateConversion: Function = (time) => {
   var date= time.substring(0,4)
   console.log(date)
   var hs=time.substring(5,10)
   console.log(hs)
   
}

// dateConversion('2019-03-10 12:00')

// function dome() { 
//     let  oDate1, oDate2, iDays,ed
//     let now = new Date();
//     now.setDate(now.getDate()+1);  
//     let y=now.getFullYear();
//     let m=now.getMonth()+1;
//     let d=now.getDate();
//     oDate1 = new Date(m + '-' + d + '-' + y) 

//     if(d<15){
//         ed = new Date(y,m,0).getDate();
//         oDate2 = new Date(m + '-' + ed + '-' + y)
//     }else{
//         let em=m+1;
//         if(em>12){
//             em=1;
//             y++;
//         }
//         ed = new Date(y,em,0).getDate();
//         oDate2 = new Date(m + '-' + ed + '-' + y)
//     }
//     iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)  
//     return iDays
// }
// dome()
