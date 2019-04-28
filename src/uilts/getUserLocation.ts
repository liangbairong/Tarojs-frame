import Taro from '@tarojs/taro'

import {
  myStorage
} from './utils'
import QQMapWX from './qqmap-wx-jssdk.js'
class getUserLocation { 
  private map: any = {} 
  constructor() {
    this.map = new QQMapWX({
      key: 'BKGBZ-DQCC4-D4TUK-XIP6U-MVEBE-TNFWR'
    })
  }
  getLoca(callback) {
      //获取定位
      Taro.getLocation({
        type: 'gcj02'
      }).then(location => {
        if (location) {
          // callback({
          //   latitude: location.latitude,
          //   longitude: location.longitude
          // });
         
          this.map.reverseGeocoder({
            location: {
              latitude: location.latitude,
              longitude: location.longitude
            },
            // 测试坐标 北京 
            // location: {
            //   latitude: 40.012569, 
            //   longitude: 116.49729
            // },
            // 上海
            // location: {
            //   latitude: 31.232471,
            //   longitude: 121.477091
            // },
            // 重庆
            // location: {
            //   latitude: 29.569499,
            //   longitude:  106.53774
            // },
            success: (res) => {
              var userLocation = res.result.ad_info;
              var county = userLocation.adcode;
              userLocation.county = county;
              userLocation.city = county.substring(0, 4);
              userLocation.province = county.substring(0, 2);
              userLocation.address_component=res.result.address_component
              userLocation.location = {
                lat: location.latitude,
                lng: location.longitude
              }
              console.log(userLocation)
              callback(userLocation);
            }
          })
        }
      }).catch(err => {
        console.log(err)
        Taro.showToast({
          icon: 'none',
          title: err.errMsg,
          duration: 1000
        });
      })
    
  
  }
  //查询周边城市
  getDistrictByCity(cityCode, callback) {
      var data=myStorage.get('sistrictByCity_'+cityCode);
      if(data){
        callback(data)
        return
      }
      this.map.getDistrictByCityId({
        id: cityCode + "00",
        success: function (data) {
          if (data.status === 0) {
            myStorage.set("sistrictByCity_"+cityCode,data.result[0])
            callback(data.result[0])
          } else {
            callback([])
          }
        },
        fail: function (data) {
          console.log(data);

          Taro.showToast({
            icon: 'none',
            title: data + "",
            duration: 1000
          });
        }
      });
    
  }
  //计算距离
   calculate(loacArr) {

      var arr:Array<number>=[]
      var my= myStorage.get("userLocation")
      if(loacArr.length===0){
        return new Promise((resolve, reject) => {
          resolve([])
        })
      }
      return new Promise((resolve, reject) => {
        this.map.calculateDistance({
          from: { 
            latitude: my.location.lat,
            longitude: my.location.lng
          },
          to: loacArr,
          success(res) {
            console.log(res)
            res.result.elements.forEach(element => {
              var distance = Math.floor(element.distance / 1000 * 100) / 100;
              arr.push(distance)
            });
            resolve(arr)
          },
          fail(err) {
            reject(err)
          }
        })
      })

    }

  


}

export default getUserLocation
