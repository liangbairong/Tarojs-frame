import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
interface TabSelect {
    props: any,
    state: any,
    defaultProps: any

}
@inject('appStore')
@observer
class TabSelect extends Component {
    static defaultProps = {
        tab: [
           'dome'
        ]
    }
    constructor(props) {
        super(props)
        this.state = {
            action: 0
        }
    }

    // 被载入
    componentWillMount() {

    }
    select(i) {
        const { tab } = this.props
        this.props.onCut(tab[i])
        this.setState({
            action: i
        })
    }
    render() {
        const { tab } = this.props
        const { action } = this.state
        return (
            <View className='tabbox'>
                <View className='title'>
                    {
                        tab.map((item, i) => {
                            return (
                                <View key={i} className={`title_li ${action === i ? 'title_li_on' : ''}`} onClick={this.select.bind(this, i)}>
                                    {item}
                                </View>
                            )
                        })
                    }
                </View>
                {
                    action == 0 && <View>{this.props.renderHeader}</View>
                }
                {
                    action == 1 && <View>{this.props.renderFooter}</View>
                }
            </View>

        )
    }
}

export default TabSelect
