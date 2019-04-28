import Taro, { Component, Config } from '@tarojs/taro'
import {
  View,
  Text, Navigator, ScrollView,
  Image,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './list.scss'
import Footer from '../../components/footer/footer'
import Hint from '../../components/hint/hint'
type PageStateProps = {
  appStore: {
    $api: any,
    configInfo: any,
    configDict: any,
    userLocation: any,
    SHARECONFIG: Function,
    isBindTel: any
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
    navigationBarTitleText: '抽奖',
    usingComponents: {},
    enablePullDownRefresh: true,
    // disableScroll: true
  }

  constructor(props) {
    super(props)
    this.state = {
      pagenum: 1,
      moveState: true,
      list: [],
      menuList: [],
      menuAction: 0
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



  // 分享
  onShareAppMessage() {
    const { appStore: { SHARECONFIG } } = this.props
    return SHARECONFIG();
  }



  init(callback = () => { }) {
    const { appStore: { configInfo } } = this.props
    let temp = JSON.parse(JSON.stringify(configInfo['gift_type']['items']))
    temp.unshift({
      "itemid": "",
      "name": "全部",
    })

    this.setState({
      pagenum: 1,
      moveState: true,
      list: [],
      menuList: temp,
      menuAction: 0
    }, () => {
      this.getList();
      callback();
    })
  }

  getList() {
    const { appStore: { $api, configDict } } = this.props
    const { pagenum, list, menuList, menuAction } = this.state
    $api.lottery.list(menuList[menuAction].itemid, pagenum).then(res => {
      if (res.errcode === 0) {
        if (res.data.data.length == 0) {
          this.setState({
            moveState: false,
          })
          return
        }
        let temp = res.data.data.map(item => {
          item.gift_info = JSON.parse(item.gift_info)
          item.gift_info.icon = process.env.IMG_URL + item.gift_info.icon
          item.ticket_type_u = configDict.ticket_type[item.ticket_type]
          item.endtime_u=item.endtime.substring(5)
          return item
        })
        var arr = list.concat(temp);
        this.setState({
          list: arr
        })
      }
    })
  }

  cut(index) {
    this.setState({
      menuAction: index,
      pagenum: 1,
      moveState: true,
      list: [],
    }, () => {
      this.getList();
    })
  }
  //加载更多
  onReachBottom() {
    const { pagenum, moveState } = this.state
    if (moveState) {
      var num = pagenum + 1;
      console.log(num)
      this.setState({
        pagenum: num
      }, () => {
        console.log(this.state.pagenum)
        this.getList();
      })

    }
  }

  //小程序下拉刷新
  onPullDownRefresh() {
    Taro.vibrateShort()
    this.init(() => {
      Taro.stopPullDownRefresh()
    })
  }






  render() {
    const { list, menuList, menuAction } = this.state
    return (
      <View>
        <ScrollView scrollX className='menu'>
          {
            menuList.map((item, i) => {
              return (
                <View onClick={this.cut.bind(this, i)} className={`menu_li ${i === menuAction ? 'menu_li_action' : ''}`} key={i}>{item.name}</View>
              )
            })
          }
        </ScrollView>



        <View className='con'>
          {
            list.map((item, i) => {
              return (
                <View className='con_li' key={i}>
                  <Navigator url={`/pages/details/details?lotteryid=${item.lotteryid}`} className='con_li_con'>
                    <Image src={item.gift_info.icon} mode='aspectFill' lazyLoad />
                    <View className='con_li_box'>
                      <View className='con_li_tit'>{item.gift_info.name}</View>
                      <View className='con_li_p'>参与人数 {item.tickets_total}</View>
                          <View className='con_li_p'>开奖时间 {item.endtime_u}</View>
                    </View>
                    <View className='gift_type'>
                      {item.ticket_type_u}
                    </View>
                  </Navigator>
                </View>
              )
            })
          }
        </View>
        {
          list.length > 4 && <Footer />
        }
        {
          list.length ===0 && <Hint type={1} />
        }
      </View>
    )
  }
}

export default Index
