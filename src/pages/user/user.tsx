import Taro, { Component, Config } from '@tarojs/taro'
import {
  View,
  Text,
  Navigator, Button,
  Image,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './user.scss'

type PageStateProps = {
  appStore: {
    $api: any,
    configInfo: any,
    configDict: any,
    userLocation: any,
    SHARECONFIG: Function,
    isLogin: Function,
    isBindTel: any,
    userInfo: any,
    reloadUserInfo: Function
  }
}

interface User {
  props: PageStateProps;
  state: any,
  createCode: any,
  wx: any
}

@inject('appStore')
@observer
class User extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '我的',
    usingComponents: {},
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#eb5d51',
    navigationBarTextStyle:'white',
    backgroundColorTop: "#eb5d51"
    // enablePullDownRefresh: true,
    // disableScroll: true
  }

  constructor(props) {
    super(props)

    this.state = {
    }



  }
  // 被载入
  componentWillMount() {
    this.init(() => {
      Taro.hideNavigationBarLoading()
    })

    console.log("Sd")
  }


  componentDidShow() {
    const { appStore: { isLogin, reloadUserInfo } } = this.props
    if (isLogin()) {
      reloadUserInfo()
    }
  }



  // 分享
  onShareAppMessage() {
    const { appStore: { SHARECONFIG } } = this.props
    return SHARECONFIG();
  }



  init(callback = () => { }) {
    this.goToLogin();
  }

  // 去登录
  goToLogin(callback = () => { }) {
    const { appStore: { isLogin } } = this.props
    if (isLogin()) {
      callback()
    }
  }


  goLink(url) {
    this.goToLogin(() => {
      Taro.navigateTo({
        url: url
      })
    })
  }

  render() {
    const { appStore: { userInfo } } = this.props
    return (
      <View>
        <View className='top_bg'>
          <View className='top_box'>
            {
              userInfo.nickname ? <View>
                <View className='user_box'>
                  <View className='user_headimg'>
                    <Image mode='aspectFill' src={userInfo.avatar} />
                  </View>
                  <View className='user_right'>
                    <View className='user_name'>{userInfo.nickname}</View>
                    <View className="user_tel">{userInfo.tel_u}</View>
                  </View>
                </View>
              </View>
                :
                <View className='no_login' onClick={this.goToLogin.bind(this)}>
                  您还没有登录，去登录
                </View>
            } 
          </View>
          <View className='user_roll'>
            <View className='user_roll_li'>
              <View className='p'> <Text className='user_roll_li_max'>{userInfo.ticket_summary.free.status0_u}</Text> 张</View>
              <View className='user_roll_li_tit'>免费券</View>
            </View>
            <View className='user_roll_li'>
              <View className='p'> <Text className='user_roll_li_max'>{userInfo.ticket_summary.pearl['status-0']}</Text> 张</View>
              <View className='user_roll_li_tit'>珍珠券</View>
            </View>
            <View className='user_roll_li'>
              <View className='p'> <Text className='user_roll_li_max'>{userInfo.ticket_summary.shell['status-0']}</Text> 张</View>
              <View className='user_roll_li_tit'>贝壳券</View>
            </View>
          </View>
        </View>

        <View className='user_content'>
        <View className='user_order'>
          <View onClick={this.goLink.bind(this, '/pages/order/order?type=0')} className='user_order_li'>
            <Image mode='aspectFill' className='' src={require('../../assets/image/user_order_1.jpg')} />
            <View className='p'>待开奖  <Text className='red'>{userInfo.lottery_summary['status-0']}</Text></View>
          </View>
          <View onClick={this.goLink.bind(this, '/pages/order/order?type=1')} className='user_order_li'>
            <Image mode='aspectFill' className='' src={require('../../assets/image/user_order_2.jpg')} />
            <View className='p'>已开奖  <Text className='red'>{userInfo.lottery_summary['status-1']}</Text></View>
          </View>
        </View>



        <View className='user_main'>
          <View className='user_line' onClick={this.goLink.bind(this, '/pages/knapsack/knapsack')}>
            我的背包 <Image mode='aspectFit' className='user_line_jt' src={require('../../assets/image/icon_d.png')} />
          </View>
          <View className='user_line' onClick={this.goLink.bind(this, '/pages/myLotteryRoll/myLotteryRoll')}>
            我的抽奖券 <Image mode='aspectFit' className='user_line_jt' src={require('../../assets/image/icon_d.png')} />
          </View>
          <View className='user_line' onClick={this.goLink.bind(this, '/pages/site/site')}>
            地址管理 <Image mode='aspectFit' className='user_line_jt' src={require('../../assets/image/icon_d.png')} />
          </View>
        </View>
        <View className='user_main'>
          <Navigator url='/pages/rule/rule' hoverClass="none" className='user_line'>
            规则说明 <Image mode='aspectFit' className='user_line_jt' src={require('../../assets/image/icon_d.png')} />
          </Navigator>
        </View>
        </View>
      </View>
    )
  }
}

export default User
