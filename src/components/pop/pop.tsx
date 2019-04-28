import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface Pop {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class Pop extends Component {
    static options = {
        addGlobalClass: true
    }
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            animation: true
        }
    }

    // 被载入
    componentWillMount() {

    }
    show() {
        this.setState({
            isShow: true,
            animation: true
        })
    }
    hide() {
        this.setState({
            animation: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    isShow: false,
                })
            }, 300)
        })

        this.props.onHide()

    }
  
   

    render() {
        const { isShow, animation } = this.state
        return (
            <View className=''>
                {
                    isShow && <View className={`bg ${animation ? "bgIn" : "bgOut"}`} onClick={this.hide.bind(this)}></View>
                }
                {
                    isShow && <View className={`pop_con ${animation ? "popshow" : "pophide"}`} >
                        {this.props.children}
                    </View>
                }
            </View>
        )
    }
}

export default Pop
