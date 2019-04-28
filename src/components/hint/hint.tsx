import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface Hint {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class Hint extends Component {
    static defaultProps = {
        type: 0,
        title:''
    }
    constructor(props) {
        super(props)
        this.state = {
            img: [
                {
                    title: '没有数据',
                    url: require("../../assets/image/null.png"),
                },
            ]
        }

    }

    // 被载入
    componentWillMount() {

    }





    render() {
        const { img } = this.state
        const { type,title } = this.props
        return (
            <View>
                {
                    type == 0 && <View className='errhintBox'>
                        <View>
                            <Image mode="aspectFill" className='errhintBox_img' src={img[0].url} />
                            <View className='errhintBox_p'>{img[this.props.type].title}</View>
                        </View>
                    </View>
                }
                {
                     type == 1  && <View className='enwo'>
                
                         <Image mode="aspectFill" className='errhintBox_img' src={img[0].url} />
                         <View className='errhintBox_p'>{title || img[0].title}</View>
                    
                 </View>
                }

            </View>
        )
    }
}

export default Hint
