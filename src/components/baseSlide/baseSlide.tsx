import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface BaseSlide {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class BaseSlide extends Component {
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
            animation:true
        })
    }
    hide(){
        this.setState({
            animation:false
        },()=>{
            setTimeout(()=>{
                this.setState({
                    isShow: false,
                })
            },300)
        })
        this.props.onHide()
    }
    
    render() {
        const { isShow,animation  } = this.state
        return (
            <View className=''>
                {
                    isShow && <View  className={`bg ${animation ? "bgIn":"bgOut"}`} onClick={this.hide.bind(this)}></View>
                }
                {
                    isShow && <View className={`base_slide_con ${animation ? "slide_show":"slide_hide"}`} >
                        {this.props.children}
                    </View>
                }
            </View>
        )
    }
}

export default BaseSlide
