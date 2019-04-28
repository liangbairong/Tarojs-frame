import http from './http'
export default {
  // 通用类
  common: {
    err_info() {
      return new http({
        url: process.env.ROOT + '/common/err_info',
        data: {}
      })
    },
    // 轮播图
    banner_list() {
      return new http({
        url: process.env.ROOT + '/common/banner_list',
        topLoading: true,
      })
    },
    // 区域列表 province
    area_dict(province) {
      return new http({
        url: process.env.ROOT + '/common/area_dict',
        data: {
          province
        }
      })
    },
    // 城市列表
    area_list(data) {
      return new http({
        url: process.env.ROOT + '/common/area_list',
        data: data
      })
    },
    captcha() {
      return new http({
        url: process.env.ROOT + '/common/captcha',
      })
    },
    // 字典翻译
    config_dict(checksum = '') {
      return new http({
        url: process.env.ROOT + '/common/config_dict',
        data: {
          checksum
        }
      })
    },
    // 翻译内容
    config_info(checksum = '') {
      return new http({
        url: process.env.ROOT + '/common/config_info',
        data: {
          checksum
        }
      })
    },
    // 登录
    login(code, data, iv) {
      return new http({
        url: process.env.ROOT + '/common/login',
        method: "post",
        data: {
          code,
          data,
          iv
        },
        loading: true
      })
    },
    msgcode(biztype, tel) {
      return new http({
        url: process.env.ROOT + '/common/msgcode',
        method: "post",
        data: {
          biztype: biztype,
          tel: tel
        },
        loading: true
      })
    },

    home_data() {
      return new http({
        url: process.env.ROOT + '/common/home_data',
      })
    },




  },
  user: {
    info() {
      return new http({
        url: process.env.ROOT + '/user/info',
        data: {}
      })
    },
  },


}