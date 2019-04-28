import Taro, { Component, Config } from '@tarojs/taro'
import {
  View,
  Text,
  Swiper,
  SwiperItem, ScrollView, Navigator,
  Image,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import Footer from '../../components/footer/footer'
// import IndexSwiper from '../../components/indexSwiper/indexSwiper'
import FormIdBtn from '../../components/formIdBtn/formIdBtn'
type PageStateProps = {
  appStore: {
    $api: any,
    configInfo: any,
    configDict: any,
    userLocation: any,
    SHARECONFIG: Function,
    isLogin: Function,
    isBindTel: any,
    getUserLocationStore:Function
  }
}

interface Index {
  props: PageStateProps;
  state: any,
  createCode: any,
  wx: any
}

@inject('appStore')
@observer
class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '天天奖堂',
    usingComponents: {},
    enablePullDownRefresh: true,
    // disableScroll: true
  }

  constructor(props) {
    super(props)
    this.state = {
      bannerListData:[],
      lotteryList: [],
      giftList: [],
      sponsorList: [],

    }



  }
  // 被载入
  componentWillMount() {
    this.init(() => {
      Taro.hideNavigationBarLoading()
    })
  }
  componentDidShow() {

  }
  // componentDidHide() {
  //   this.refs.inSwiper.stop()
  // }



  // 分享
  onShareAppMessage() {
    const { appStore: { SHARECONFIG } } = this.props
    return SHARECONFIG();
  }



  init(callback = () => { }) {
    const { appStore: { $api, configDict } } = this.props

    Promise.all([$api.common.home_data(), $api.common.banner_list()]).then(res => {
      if (res[0].errcode === 0) {
        let data = res[0].data
        let lotteryList = data.lottery.map((item) => {
          item.gift_info = JSON.parse(item.gift_info)
          item.gift_info.icon = process.env.IMG_URL + item.gift_info.icon
          item.ticket_type_u = configDict.ticket_type[item.ticket_type]
          item.endtime_u = item.endtime.substring(5)
          return item
        })

        let sponsorList = data.sponsor.map(item => {
          item.logo = process.env.IMG_URL + item.logo
          return item
        })

        let giftList = data.gift.map(item => {
          item.gift_info = JSON.parse(item.gift_info)
          item.gift_info.icon = process.env.IMG_URL + item.gift_info.icon
          item.ticket_type_u = configDict.ticket_type[item.ticket_type]

          return item
        })
        this.setState({
          sponsorList,
          lotteryList,
          giftList
        })
      }

      if (res[1].errcode === 0) {
        res[1].data = res[1].data.map(item => {
          item.imgurl = process.env.IMG_URL + item.imgurl;
          return item
        })
        this.setState({ bannerListData: res[1].data })
      }

      callback()
    })
  }




  //小程序下拉刷新
  onPullDownRefresh() {
    Taro.vibrateShort()
    this.init(() => {
      Taro.stopPullDownRefresh()
    })
  }
  nav(url) {
    Taro.navigateTo({
      url: url
    })
  }

  gotoDet(param, formid) {
    const { appStore: { isLogin } } = this.props
    console.log(param)
    console.log(formid)
    if (isLogin()) {
      this.nav(`/pages/details/details?lotteryid=${param.lotteryid}&formid=${formid}`)
    }
  }

      //轮播图进入
      bannerInto(type, data) {
        const { appStore: { isLogin } } = this.props
        if (isLogin()) {
            // h5
            if (type == 0) {
                Taro.navigateTo({
                    url: '/pages/webview/webview?url=' + encodeURIComponent(data)
                })
            }
            // 抽奖
            if (type == 1) {
                Taro.navigateTo({
                    url: `/pages/details/details?lotteryid=${data}`
                })
            }
            // 奖品
            if (type == 2) {
                Taro.navigateTo({
                    url: `/pages/giftDet/giftDet?giftid=${data}`
                })
            }
              // 话题
            if (type == 4) {
                Taro.navigateTo({
                    url: '/pages/topicDet/topicDet?topicid='+data
                })
            }
        }
    }

        //重新去获取定位信息
  getJurisdiction() {
    Taro.openSetting().then(res => {
        if (res.authSetting["scope.userLocation"]) {
          const { appStore: { getUserLocationStore } } = this.props
          getUserLocationStore()
           
        }
    })
}

  render() {
    const { lotteryList, giftList, sponsorList, bannerListData } = this.state
    const {appStore:{userLocation}}=this.props

    const bannerListDataItems = bannerListData.map((item, index) => {
      return (
        <SwiperItem key={index}> 
          <Image  src={item.imgurl} mode="aspectFill" onClick={this.bannerInto.bind(this, item.type, item.data)}
            className="banner_li" />
        </SwiperItem>
      )
    })
    return (
      <View>
         {
          userLocation ? <View className='tit'>
          <Image src={require('../../assets/image/dw.png')} mode='aspectFill'/>
          {userLocation.address_component.city} · {userLocation.address_component.district} · {userLocation.address_component.street}
          </View>
          :
        <View className='tit' onClick={this.getJurisdiction.bind(this)}>
          去获取定位信息
        </View>
        }
         <View className='tit_h'></View>
        <Swiper
          className='banner'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {bannerListDataItems}
        </Swiper>
        {/* <View className='sw_margin'>
          <IndexSwiper ref='inSwiper'></IndexSwiper>
        </View> */}
        <View className='meta clearfix'>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/topicList/topicList')}>
            <Image src={require('../../assets/image/icon-每日签到@2x.png')} mode='aspectFill'></Image>
            <View>活动</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/nearby/nearby')}>
            <Image src={require('../../assets/image/icon-兑换商城@2x.png')} mode='aspectFill'></Image>
            <View>附近</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/ranking/ranking')}>
            <Image src={require('../../assets/image/icon-幸运大礼@2x.png')} mode='aspectFill'></Image>
            <View>排行榜</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/turntable/turntable')}>
            <Image src={require('../../assets/image/icon-幸运夺宝@2x.png')} mode='aspectFill'></Image>
            <View>幸运盘</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/topicList/topicList')}>
            <Image src={require('../../assets/image/icon-每日签到@2x.png')} mode='aspectFill'></Image>
            <View>活动</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/nearby/nearby')}>
            <Image src={require('../../assets/image/icon-兑换商城@2x.png')} mode='aspectFill'></Image>
            <View>附近</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/ranking/ranking')}>
            <Image src={require('../../assets/image/icon-幸运大礼@2x.png')} mode='aspectFill'></Image>
            <View>排行榜</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/turntable/turntable')}>
            <Image src={require('../../assets/image/icon-幸运夺宝@2x.png')} mode='aspectFill'></Image>
            <View>幸运盘</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/ranking/ranking')}>
            <Image src={require('../../assets/image/icon-幸运大礼@2x.png')} mode='aspectFill'></Image>
            <View>排行榜</View>
          </View>
          <View className='meta_li' onClick={this.nav.bind(this, '/pages/turntable/turntable')}>
            <Image src={require('../../assets/image/icon-幸运夺宝@2x.png')} mode='aspectFill'></Image>
            <View>幸运盘</View>
          </View>

        </View>

        <View className='con'>
          <View className='con_tit'><View className='con_tit_con'>限时抢购</View></View>
          <View className='clearfix'>
            {
              lotteryList.map((item, i) => {
                return (
                  <View className='con_li' key={i}>
                    <View className='con_li_con'>
                      <FormIdBtn param={{ lotteryid: item.lotteryid }} onCallback={this.gotoDet.bind(this)} >
                        <Image src={item.gift_info.icon} mode='aspectFill' lazyLoad />
                        <View className='con_li_box'>
                          <View className='con_li_tit'>{item.gift_info.name}</View>
                          <View className='con_li_p'>参与人数 {item.tickets_total}</View>
                          <View className='con_li_p'>开奖时间 {item.endtime_u}</View>
                        </View>
                        <View className='gift_type'>
                          {item.ticket_type_u}
                        </View>
                        <View className='periods'>
                          ￥{item.gift_info.price}
                        </View>
                      </FormIdBtn>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='con'>
          <View className='con_tit'><View className='con_tit_con'>热门奖品</View></View>
          <View className='clearfix'>
            {
              giftList.map((item, i) => {
                return (
                  <View className='con_li' key={i}>
                    <Navigator url={`/pages/giftDet/giftDet?giftid=${item.giftid}`} className='con_li_con'>
                      <Image src={item.gift_info.icon} mode='aspectFill' lazyLoad />
                      <View className='con_li_box'>
                        <View className='con_li_tit'>{item.gift_info.name}</View>
                        <View className='con_li_p'>奖品期数 {item.round_total}</View>
                      </View>
                      <View className='periods'>
                        ￥{item.gift_info.price}
                      </View>
                    </Navigator>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='con'>
          <View className='con_tit'><View className='con_tit_con'>赞助商</View></View>
          <View className='clearfix'>
            {
              sponsorList.map((item, i) => {
                return (
                  <View className='con_li2' key={i}>
                    <Navigator url={`/pages/sponsorDet/sponsorDet?sponsorid=${item.sponsorid}`} className='con_li_con'>
                      <Image src={item.logo} mode='aspectFill' lazyLoad />
                    </Navigator>
                  </View>
                )
              })
            }
          </View>
        </View>

        <Footer />

      </View>
    )
  }
}

export default Index
