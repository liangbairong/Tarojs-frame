import Taro, { Component, Config } from '@tarojs/taro'
import {
  View,
  Text,
  Swiper,
  SwiperItem, Button,
  Image,
  Navigator,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './details.scss'
import {
  myStorage
} from '../../uilts/utils'
import TabSelect from '../../components/tabSelect/tabSelect'
import ProgressBar from '../../components/progressBar/progressBar'
import BaseSlide from '../../components/baseSlide/baseSlide'
import Amount from '../../components/amount/amount'
type PageStateProps = {
  appStore: {
    SHARECONFIG: any
    $api: any,
    isLogin: Function,
    configDict: any,
    userInfo: any
  }
}

interface Details {
  props: PageStateProps;
  state: any,
}

@inject('appStore')
@observer
class Details extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '商品详情',
    usingComponents: {},
    enablePullDownRefresh: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      lotteryid: '',
      isTake: false, //是否参与抽奖
      userList: [],
      lotteryData: {},
    }
  }
  // 被载入
  componentWillMount() {
    this.init(null, () => {
      Taro.hideNavigationBarLoading()
    })
  }
  // 分享
  onShareAppMessage() {
    const { appStore: { SHARECONFIG, userInfo } } = this.props
    const { lotteryData } = this.state
    return SHARECONFIG({
      title: userInfo.nickname + '邀请你参与' + lotteryData.name + '抽奖',
      desc: '',
      path: '/pages/details/details?lotteryid=' + lotteryData.lotteryid
    });
  }



  init(tabeCallback, callback = () => { }) {
    const { appStore: { $api, configDict } } = this.props
    var lotteryid = this.$router.params.lotteryid
    var formid = this.$router.params.formid
    this.setState({
      lotteryid,
    })

    Promise.all([$api.lottery.info(lotteryid, formid), $api.lottery.order_list(lotteryid, 1)]).then(res => {
      if (res[0].errcode === 0) {
        var data = res[0].data;
        data.images = JSON.parse(data.images);
        data.images = data.images.map(item => {
          item = process.env.IMG_URL + item
          return item
        })
        data.gift_info = JSON.parse(data.gift_info)
        data.gift_info.icon = process.env.IMG_URL_HTTPS + data.gift_info.icon
        data.gift.images = JSON.parse(data.gift.images);
        data.gift.images = data.gift.images.map(item => {
          item = process.env.IMG_URL + item
          return item
        })
        data.sponsor.logo = process.env.IMG_URL_HTTPS + data.sponsor.logo
        data.gift.profile = process.env.IMG_URL + data.gift.profile
        // 抽奖类型
        data.ticket_type_u = configDict.ticket_type[data.ticket_type]
        // 获取奖品类型 实物或虚拟
        data.delivery_u = configDict.gift_delivery[data.delivery]
        // 奖品标签
        // data.gift.type_u = configDict['gift_type_' + data.gift.type][data.gift.subtype]

        // 广告
        if (data.leafletid > 0 && data.leaflet_info) {
          data.leaflet_info = JSON.parse(data.leaflet_info);
          data.leaflet_info.banner = process.env.IMG_URL + data.leaflet_info.banner
          data.gift.images.splice(1, 0, data.leaflet_info.banner)
          if (data.leaflet_info.profiles) {
            data.leaflet_info.profiles = JSON.parse(data.leaflet_info.profiles)
            data.leaflet_info.profiles = data.leaflet_info.profiles.map(item => {
              item = process.env.IMG_URL + item
              return item
            })
          }

        }

        // 参与
        if (data.order) {
          data.order.ymdhms_u = data.order.ymdhms.substring(5, 16)
          this.setState({
            isTake: true
          })
        }
        // 中奖
        if (data.hited_order) {
          data.hited_order.ymdhms_u = data.hited_order.ymdhms.substring(5, 16)
        }

        this.setState({
          lotteryData: data
        }, () => {
          if (tabeCallback) tabeCallback()
        })
      }
      if (res[1].errcode === 0) {
        let temp = res[1].data.data;
        temp = temp.map(item => {
          item.ymdhms_u = item.ymdhms.substring(5, 16)
          return item
        })
        this.setState({
          userList: temp
        })
      }
      callback();
    })



  }
  //小程序下拉刷新
  onPullDownRefresh() {
    Taro.vibrateShort()
    this.init(null, () => {
      Taro.stopPullDownRefresh()
    })
  }
  gotoShare() {
    const { lotteryData } = this.state
    myStorage.set('lotteryData', lotteryData)
    Taro.navigateTo({
      url: '/pages/share/share'
    })
  }

 

  take() {
    const { appStore: { $api, isLogin } } = this.props
    const { lotteryid, isTake } = this.state
    if (!isLogin()) {
      return
    }
    if (isTake) {
      return
    }
    $api.lottery.enroll(lotteryid).then(res => {
      if (res.errcode === 0) {
        this.setState({
          isTake: true
        })
        this.init(() => {
          this.refs.prog.upload()
        });
      }
    })
  }
  // 预览图片
  previewImage(item, list) {
    Taro.previewImage({
      current: item,
      urls: list
    })
  }

  openSlide() {
    this.refs.slide.show()
  }

  // 获取数量
  getValue(index,value){

  }
  closeSlide(){
    this.refs.slide.hide()
  }

  next(){
    Taro.navigateTo({
      url: '/pages/placeOrder/placeOrder'
    })
  }


  render() {
    const { lotteryData, isTake, userList, lotteryid } = this.state
    const { appStore: { userInfo } } = this.props
    return (
      <View>
        <View className='banner_out'>
          <Swiper
            className='banner'
            indicatorColor='#999'
            indicatorActiveColor='#fff'
            circular
            indicatorDots
            autoplay>
            {
              lotteryData.gift.images && lotteryData.gift.images.map((item, i) => {
                return (
                  <SwiperItem key={i}>
                    <View className='banner_li' onClick={this.previewImage.bind(this, item, lotteryData.gift.images)}><Image mode='aspectFill' src={item} /></View>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View className='periods'>
            期数：{lotteryData.roundno}/{lotteryData.round_total}
          </View>
          <View className='gift_type'>
            {lotteryData.ticket_type_u}
          </View>
        </View>

        <View className='title_box'>
          <View className='tit'>
            {lotteryData.gift_info.name}
          </View>
          <View className='draw_con'>
            <View className='draw_time'>
              类型：<Text>{lotteryData.delivery_u}</Text>
              {
                lotteryData && lotteryData.delivery == 1 && <Image mode='aspectFill' className='by' src={require('../../assets/image/by.png')} />
              }

            </View>
            <View className='draw_time'>
              价格：<Text className='red'>￥{lotteryData.gift.price}</Text>
            </View>
          </View>

          <Navigator url={`/pages/sponsorDet/sponsorDet?sponsorid=${lotteryData.sponsor.sponsorid}`} className='sponsor'>
            <Text>赞助商</Text>
            <Text>{lotteryData.sponsor.brand}</Text>
          </Navigator>
          <View className='sponsor' >
            <Text>活动状态</Text>
            {
              lotteryData.status == 1 && <Text className='red'>活动进行中</Text>
            }
            {
              lotteryData.status == 2 && <Text className='red'>活动已结束</Text>
            }
          </View>

        </View>

        <View className='gift_box'>
          <TabSelect tab={['抽奖说明', '奖品详情']}
            renderHeader={<View>{
              (lotteryData.leafletid > 0 && lotteryData.leaflet_info) ?
                lotteryData.leaflet_info.profiles.map((item, i) => {
                  return (
                    <Image mode='widthFix' className='gift_img' key={i} src={item} lazyLoad />
                  )
                }) :
                lotteryData.images.map((item, i) => {
                  return (
                    <Image mode='widthFix' className='gift_img' key={i} src={item} lazyLoad />
                  )
                })
            }</View>}
            renderFooter={<Image mode='widthFix' className='gift_img' src={lotteryData.gift.profile} lazyLoad />}
          />
        </View>
        <View className='strut_h'></View>
        <View className='footer'>
          <Navigator openType='switchTab' className='footer_nav' url='/pages/index/index'>
            <Image mode='aspectFill' src={require('../../assets/image/nav_1.png')} />
            首页
          </Navigator>
          <Navigator openType='switchTab' className='footer_nav' url='/pages/shopping/shopping'>
            <Image mode='aspectFill' src={require('../../assets/image/nav_3.png')} />
            购物车
          </Navigator>
          <Button className='shopping_btn' hoverClass='' onClick={this.openSlide.bind(this)}>加入购物车</Button>
          <Button className='sub_btn' hoverClass='' onClick={this.openSlide.bind(this)}>立即购买</Button>
        </View>

        {/* 数量 */}
        <BaseSlide ref='slide'>
          <Image mode='aspectFill' className='slide_close' onClick={this.closeSlide.bind(this)} src={require('../../assets/image/exit_icon.png')} />
          <View className="slide_box">
            <View className='slide_box_left'>
              <Image mode='aspectFill' src={require('../../assets/image/nav_3.png')} />
            </View>
            <View className='slide_box_right'>
              <View>￥79</View>
              <View>库存：100</View>
            </View>
          </View>
          <View className='slide_number'>
            <View className='slide_number_tit'>数量</View>
            <View>
              <Amount index={0} value={1} onGetValue={this.getValue.bind(this)} />
            </View>
          </View>
          <Button className='slide_btn' hoverClass='' onClick={this.next.bind(this)}>立即购买</Button>
        </BaseSlide>
      </View>
    )
  }
}

export default Details
