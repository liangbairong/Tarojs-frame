import Taro, { Component, Config } from '@tarojs/taro'
import {
  View,
  Text,
  Navigator, Button,
  Image,
} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './order.scss'
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

interface Order {
  props: PageStateProps;
  state: any,
  createCode: any,
  wx: any
}

@inject('appStore')
@observer
class Order extends Component {
  config: Config = {
    navigationBarTitleText: '我参与的',
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
      type: 0,
    }



  }
  // 被载入
  componentWillMount() {
    var type = this.$router.params.type;
    if(type==0){
      Taro.setNavigationBarTitle({
        title: '待开奖' 
      })
    }else{
      Taro.setNavigationBarTitle({
        title: '已开奖' 
      })
    }
    
    this.setState({
      type: type
    }, () => {
      this.init(() => {
        Taro.hideNavigationBarLoading()
      })
    })

  }




  // 分享
  onShareAppMessage() {
    const { appStore: { SHARECONFIG } } = this.props
    return SHARECONFIG();
  }



  init(callback = () => { }) {

    this.setState({
      pagenum: 1,
      moveState: true,
      list: [],

    }, () => {
      this.getList();
      callback();
    })
  }


  getList() {
    const { appStore: { $api, configDict } } = this.props
    const { pagenum, list, type } = this.state
    // 0-待开奖，1-已开奖
    $api.user.lottery_list(type, pagenum).then(res => {
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
          // 获取奖品类型 实物或虚拟
          item.gift_info.delivery_u = configDict.gift_delivery[item.gift_info.delivery]

          item.ticket_type_u = configDict.ticket_type[item.ticket_type]
          return item
        })
        var arr = list.concat(temp);
        this.setState({
          list: arr
        })
      }
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
    const { list } = this.state
    return (
      <View>
        <View className='con'>
          {
            list.map((item, i) => {
              return (
                <Navigator url={`/pages/details/details?lotteryid=${item.lotteryid}`} className='con_li' key={i}>
                {/* hited=1 中奖 */}
                {
                  item.hited==1 && <Image src={require('../../assets/image/action_z.png')} mode='aspectFill' className='action_z' lazyLoad />
                }
                  <View className='icon_box'>
                    <Image src={item.gift_info.icon} mode='aspectFill' className='icon' lazyLoad />
                  </View>
                  <View className='con_li_box'>
                    <View className='con_li_tit one_hidden'>{item.gift_info.name}</View>
                    <View className='con_li_p'>
                      价格 <Text className='red'>￥{item.gift_info.price}</Text>
                    </View>
                    <View className='con_li_p'>
                      抽奖类型 <Text>{item.ticket_type_u}</Text>
                    </View>
                    <View className='con_li_p'>
                      参与时间 <Text>{item.ymdhms0}</Text>
                    </View>
                  </View>
                </Navigator>
              )
            })
          }
          {
            list.length === 0 && <Hint type={0} />
          }
        </View>
      </View>
    )
  }
}

export default Order
