import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface IndexSwiper {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class IndexSwiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fz: [0, 1, 3],
            bannerListData: [],
            w: 0,  //每个小图宽度
            listItemW: 0,  //列表宽度
            interval: 0, //每小块间间隔
            dist: 0, //移动x
            index: 0, //索引
            sum: 0, //总数
            trans: 'transform 0.3s',
            Interval: null,


            startX: 0,
            moveX: 0,
            isSlide: true,

        }

    }

    // 被载入
    componentWillMount() {
        var sys = Taro.getSystemInfoSync();
        var pageW = sys.windowWidth
        var w = pageW * 0.92;
        this.setState({
            w: w,
            interval: pageW * 0.04,
        })
        console.log(sys)
        this.init()
    }
    componentWillUnmount() {
        this.stop()
    }

    getBanner() {
        const { appStore: { $api } } = this.props
        this.stop()
        $api.common.banner_list().then(res => {
            if (res.errcode === 0) {
                res.data = res.data.map(item => {
                    item.imgurl = process.env.IMG_URL + item.imgurl;
                    return item
                })
                var len = res.data.length;
                var listItemW = ((this.state.w + this.state.interval / 2) * len)
                this.setState({ bannerListData: res.data, sum: len, listItemW: listItemW }, () => {
                    this.start();
                })


            }
        })

    }
    init() {
        this.getBanner()
    }
    start() {
        const { index, w, interval, sum } = this.state
        var i = index;
        // var times = 
        this.setState({
            Interval: setInterval(() => {
                if (i < (sum - 1)) {
                    i++;

                    this.setState({
                        index: i,
                        dist: (w + (interval / 2)) * i,
                    })
                } else {
                    this.setState({
                        index: sum,
                        dist: (w + (interval / 2)) * sum,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                trans: 'none'
                            }, () => {
                                setTimeout(() => {
                                    i = 0;
                                    this.setState({
                                        index: i,
                                        dist: (w + (interval / 2)) * i,
                                    }, () => {
                                        this.setState({
                                            trans: 'transform 0.3s'
                                        })
                                    })
                                }, 100)
                            })
                        }, 301)

                    })
                }
                // console.log(index)

                //   var i = index;
                // if (i < (sum - 1)) {
                //     i++;
                // } else {
                //     i = sum
                // }
                // this.run(i)
            }, 4000)
        })
    }
    stop() {
        const { Interval } = this.state
        clearInterval(Interval)
        this.setState({
            Interval: null
        })
    }
    run(i) {
        const { w, interval, sum } = this.state
        this.setState({
            isSlide: false
        })

        this.setState({
            // index: i,
            dist: (w + (interval / 2)) * i,
        }, () => {
            if (i == sum) {
                setTimeout(() => {
                    this.setState({
                        trans: 'none'
                    }, () => {
                        setTimeout(() => {
                            i = 0;
                            this.setState({
                                index: i,
                                dist: (w + (interval / 2)) * i,
                            }, () => {
                                this.setState({
                                    trans: 'transform 0.3s',
                                    isSlide: true
                                })
                            })
                        }, 100)
                    })
                }, 400)
            }

            if (i == -1) {
                setTimeout(() => {
                    this.setState({
                        trans: 'none'
                    }, () => {
                        setTimeout(() => {
                            i = (sum - 1);
                            this.setState({
                                index: i,
                                dist: (w + (interval / 2)) * i,
                            }, () => {
                                this.setState({
                                    trans: 'transform 0.3s',
                                    isSlide: true
                                })
                            })
                        }, 100)
                    })
                }, 400)
            }
            setTimeout(() => {
                this.setState({
                    isSlide: true
                })
            }, 500)
        })

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

    toustart(e) {
        const { isSlide } = this.state
        if (!isSlide) return
        this.stop();
        var x = e.touches[0].clientX
        this.setState({
            trans: 'none',
            startX: x
        })
    }
    toumove(e) {
        const { startX, isSlide, } = this.state
        e.stopPropagation()

        if (!isSlide) return
        this.stop();
        var x = e.touches[0].clientX
        var cm = x - startX;

        this.setState({
            moveX: cm
        })

    }
    touend(e) {
        const { moveX, Interval, index, sum } = this.state
        var i = index;

        this.setState({
            moveX: 0,
            trans: 'transform 0.3s',
        }, () => {
            if (moveX > 100) {
                console.log("上一个")

                if (i !== 0) {
                    i--;
                } else {
                    i = -1
                }
                this.run(i)

            }
            if (moveX < -100) {
                if (i < (sum - 1)) {
                    i++;
                } else {
                    i = sum
                }
                this.run(i)

                console.log("下一个")
            }
            this.setState({
                index: i
            }, () => {

                this.stop();
                console.log(Interval)
                if (Interval) {

                } else {
                    console.log("iiii" + i)
                    this.start();
                }
                // setTimeout(() => {


                // }, 1000)

            })


        })



    }


    render() {

        const { bannerListData, listItemW, w, interval, dist, fz, trans, moveX } = this.state
        const bannerListDataItems = bannerListData.map((item, index) => {
            return (
                <Image key={index} src={item.imgurl} mode="aspectFill" style={`width:${w}PX;margin-right: ${interval / 2}PX`} onClick={this.bannerInto.bind(this, item.type, item.data)}
                    className="banner_item" />

            )
        })
        return (
            <View className='index_swiper' onTouchStart={this.toustart.bind(this)} onTouchMove={this.toumove.bind(this)} onTouchEnd={this.touend.bind(this)}>
                <View className='index_swiper_list clearfix' style={`width:${listItemW * 3}PX;left:${-(listItemW)}PX;transition:${trans};transform: translateX(${((interval) - dist + moveX)}PX);`}>
                    {
                        fz.map((item, i) => {
                            return (
                                <View className='index_swiper_item clearfix' key={i} style={`width:${listItemW}PX;`} >
                                    {bannerListDataItems}
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        )
    }
}

export default IndexSwiper
