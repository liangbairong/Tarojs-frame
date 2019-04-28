import {
  observable,
  action
} from 'mobx'
import Taro from '@tarojs/taro'
import $api from '../api/index'
import defaultConfig from '../defaultConfig'
import {
  myStorage
} from '../uilts/utils'
import getUserLocation from '../uilts/getUserLocation'
class appStore {
  @observable $api: any = $api;
  @observable configInfo: any = myStorage.get("configInfo") || defaultConfig.defaultConfigInfo; //info配置
  @observable configDict: any = myStorage.get("configDict") || defaultConfig.defaultConfigDict; //地址配置
  @observable SHARECONFIG: Object = defaultConfig.SHARECONFIG; //分享配置
  @observable userInfo: any = myStorage.get("userInfo") || {};
  @observable systemInfo: any = myStorage.get("systemInfo") || null;  //系统信息
  @observable userLocation: any = myStorage.get("userLocation") || null
  @observable map: any = null;
  @action init() {
    this.getConfigInfo();
    this.getConfigDict();
    this.getErrInfo();
    this.getUserLocationStore()
  }

  // 获取地址
  @action getSiteDict(province) {
    var siteDict =myStorage.get("site_dict_" + province);
    if (siteDict) {
      return new Promise((resolve, reject) => {
        resolve(siteDict)
      });
    }
    return store.$api.common.area_dict(province).then(res => {
      if (res.errcode === 0) {
        myStorage.set("site_dict_" + province,res.data)
        return res.data;
      }
    });
  }

  // 获取配置信息
  @action getConfigInfo() {
    var state=myStorage.get("isConfigInfo")
    if(state){
      return
    }
    store.$api.common.config_info().then(res => {
      if (res.errcode === 0) {
        if (res.data.checksum) {
          store.configInfo = res.data;
          myStorage.set("isConfigInfo",1,60*10); //10分钟更新一次
          myStorage.set("configInfo",res.data)
        }
      }
    });
  }
  //获取字典翻译
  @action getConfigDict() {
    var state=myStorage.get("isConfigDict")
    if(state){
      return
    }
    store.$api.common.config_dict().then(res => {
      if (res.errcode === 0) {
        if (res.data.checksum) {
          store.configDict = res.data;
          myStorage.set("isConfigDict",1,60*10)
          myStorage.set("configDict",res.data)
        }
      }
    });
  }
  //获取错误信息
  @action getErrInfo() {
    var err=myStorage.get("isErrHint")
    if(err){
      return
    }
    store.$api.common.err_info().then(res => {
      if (res.errcode === 0) {
        myStorage.set("isErrHint",1,60*10)
        myStorage.set("errHint",res.data)
      }
    });
  }
 

  @action isSessionid() {
    var sessionid = myStorage.get("sessionid") || '';
    return sessionid;
  }
  // 是否绑定手机
  @action isBindTel() {
    if(store.userInfo){
      return store.userInfo.tel
    }
    return false;
  }
  @action isLogin() {
    if (store.isSessionid() && store.isBindTel()) {
      return true
    }else{
      Taro.navigateTo({
        url: '/pages/login/login'
      })
      return false
    }
  }

  @action saveSessionid(data) {
    myStorage.set("sessionid",data)
  }

  @action saveUserInfo(data) {
    myStorage.set("userInfo",data)
  }

  // 更新
  @action reloadUserInfo(callback = () => { }) {
    if (store.isSessionid()) {
      store.$api.user.info().then(res => {
        if (res.errcode === 0) {
          if (res.data.tel) {
            res.data.tel_u = res.data.tel.substring(0, 3) + '*****' + res.data.tel.substring(8);
          }
          if(res.data.ticket_summary){
            res.data.ticket_summary.free.status0_u=parseInt(res.data.ticket_summary.free['status-0']) +parseInt(res.data.ticket_summary.free.today.total)
          }
          store.saveUserInfo(res.data);
          store.userInfo = res.data;
          callback();
        }
      });
    }
  }

  // 获取定位
  @action getUserLocationStore(){
      var map = new getUserLocation()
      store.map=map
      map.getLoca((data) => {
        if (data) {
          store.saveUserLocation(data) 
        }
      })
    
  }

  @action saveUserLocation(loc) {
    store.userLocation = loc
    myStorage.set("userLocation",loc) 
  }

}
var store: any = new appStore()
store.init();
export default store
