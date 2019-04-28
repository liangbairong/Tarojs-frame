import Taro from '@tarojs/taro'
import Errinfo from './errinfo'
import { initPeerid, initSessionid, myStorage, getUrlParam, } from '../uilts/utils'
const noLoginPage = {
    "pages/index/index": true,
    "pages/login/login": true,
}
let timeoutflag: any = null
export default class http {
    constructor(param) {
        if (param.loading) {
            Taro.showLoading({ title: '加载中' })
        }
        if (param.topLoading) {
            Taro.showNavigationBarLoading()
        }
        var methodData = {}
        var userLocation = myStorage.get("userLocation");
        if (param.method == "post") {
            methodData = {
                xekdiensdnloc: userLocation
                ? JSON.stringify(userLocation.location)
                : ""
            }
        } else {
            methodData = {
                xekdiensdnloc: userLocation
                ? JSON.stringify(userLocation.location)
                : ""
            }
        }
        return new Promise((resolve, reject) => {
            Taro.request({
                url: param.url,
                data: {
                    peerid: initPeerid(),
                    sessionid: initSessionid(),
                    ...methodData,
                    ...param.data,
                    _ts_: (new Date()).getTime(),
                },
                method: param.method || 'get',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                if (param.loading) {
                    Taro.hideLoading()
                }
                if (param.topLoading) {
                    Taro.hideNavigationBarLoading()
                }
                resolve(res.data);
                if (res.data.errinfo == 'SESSIONID_NULL' || res.data.errinfo == 'SESSIONID_INVALID') {
                    myStorage.remove('sessionid')
                    myStorage.remove('userInfo')
                    myStorage.remove('peerid')
                    var pages = Taro.getCurrentPages(); //获取加载的页面信息（结果是个数组）
                    var atPage = pages[pages.length - 1];
           
                    if (!noLoginPage[atPage['route']]) {
                        if (timeoutflag != null) {
                            clearTimeout(timeoutflag);
                        }
                       
                        timeoutflag = setTimeout(() => {
                            myStorage.set('current_page',{
                                options:atPage.options,
                                route:atPage['route']
                            })
                            Taro.redirectTo({
                                url: '/pages/login/login'
                            })
                        }, 300);


                    }
                    return;
                }

                if (res.data.errcode !== 0) {
                    if (param.errInfo) { //拦截特殊的错误
                        for (let item in param.errInfo) {
                            if (res.data.errinfo == param.errInfo[item]) {
                                return;
                            }
                        }
                    }
                    let val = Errinfo[res.data.errinfo];

                    //根据接口的错误信息翻译
                    let errHintData = myStorage.get('errHint');
                    try {
                        var urlParam = getUrlParam(param.url)
                        var addrPrve = urlParam.addrPrve;
                        var addrLast = urlParam.addrLast;
                        if (errHintData) {
                            if (errHintData[addrPrve]) {
                                if (errHintData[addrPrve][addrLast]) {
                                    val = errHintData[addrPrve][addrLast][res.data.errinfo];
                                }
                            } else {
                                if (errHintData['public_module']['public_action'][res.data.errinfo]) {
                                    val = errHintData['public_module']['public_action'][res.data.errinfo]
                                }
                            }
                        }
                    } catch (err) {

                    }
                    if (val == undefined) {
                        val = res.data.errinfo;
                    }
                    Taro.showToast({ icon: "none", title: val + '', duration: 1000 });
                }
                return res.data;
            }).catch(err => {
                Taro.showToast({ icon: "none", title: err + '', duration: 1000 });
                reject(err);
            })

        })
    }

}