import Taro, {Component, Config} from '@tarojs/taro'
import {WebView} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import { initPeerid, initSessionid} from '../../uilts/utils'
type PageStateProps = {
    appStore: {
       
    }
}

interface Webview {
    props : PageStateProps;
    state: any,
}

@inject('appStore')
@observer
class Webview extends Component {
    config : Config = {
        navigationBarTitleText: '',
    }
    constructor(props) {
        super(props);
        this.state = {
            url:''
        }
    }
   
    // 被载入
    componentWillMount() {
        var url= decodeURIComponent(this.$router.params.url)
        if(url.indexOf("?")==-1){
            url=url+"?sessionid="+initSessionid()+"&peerid="+initPeerid()
        }else{
            url=url+"&sessionid="+initSessionid()+"&peerid="+initPeerid()
        }
        this.setState({
            url:url
        })
    }
    // 页面退出
    componentWillUnmount() {}
    render() {
        const { url } =this.state
        return (
            <WebView src={url}  />
        )
    }
}

export default Webview
