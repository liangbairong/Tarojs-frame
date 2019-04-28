import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface Footer {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class Footer extends Component {
    static defaultProps = {
        type: 0
    }
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    // 被载入
    componentWillMount() {

    }
    render() {
        return (
            <View className="footer">
                <View className="footer_line_1"></View>
                <Text className="footer_title">已经到底了</Text>
                <View className="footer_line_2"></View>
            </View>

        )
    }
}

export default Footer
