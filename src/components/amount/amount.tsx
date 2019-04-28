import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface Amount {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class Amount extends Component {
    static defaultProps = {
        value: 1,
        index:0
    }
    constructor(props) {
        super(props)
        this.state={
            value:0,
        }
    }

    // 被载入
    componentWillMount() {
        this.setState({
            value:this.props.value
        })
    }
    subtract(){
        const {value}=this.state
        if(value<=1) return
        let temp=value-1
        this.setState({
            value:temp
        })
        this.props.onGetValue(this.props.index,temp)
    }
    add(){
        const {value}=this.state
        let temp=value+1
        this.setState({
            value:temp
        })
        this.props.onGetValue(this.props.index,temp);
    }
    render() {
        const {value}=this.state
        return (
            <View className='am_box'>
                 <View className={`an_span ${value<=1 ? 'an_no':''}`} onClick={this.subtract.bind(this)}>
                     -
                 </View>
                 <Input type='number' className='an_input' maxLength={3} value={value}/>
                 <View className='an_span' onClick={this.add.bind(this)}>
                     +
                 </View>
            </View>

        )
    }
}

export default Amount
