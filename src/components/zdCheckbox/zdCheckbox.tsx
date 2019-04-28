import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface ZdCheckbox {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class ZdCheckbox extends Component {
    static defaultProps = {
        isShow: false
    }
    constructor(props) {
        super(props)
    }

    // 被载入
    componentWillMount() {

    }
    render() {
        return (
            <View className={`checkbox ${this.props.isShow ? 'checkbox_on' : ''}`}>
                {
                    this.props.isShow  && <Image mode='aspectFill' src={require('../../assets/image/gou.png')}/>
                }     
            </View>

        )
    }
}

export default ZdCheckbox
