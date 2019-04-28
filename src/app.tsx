import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index/index'
import appStore from './store/index'
import './app.scss'
const store = {
    appStore
}
class App extends Component {
    config: any = {
        pages: [
            'pages/index/index',
            'pages/order/order',
            'pages/user/user',
            'pages/details/details',
            'pages/webview/webview',
            'pages/list/list',
            'pages/login/login',
        ],
        permission: {
            'scope.userLocation': {
                'desc': "你的位置信息将用于小程序位置接口的效果展示"
            }
        },
        window: {
            backgroundTextStyle: 'dark',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '天天奖堂',
            navigationBarTextStyle:'black',
            backgroundColorTop: "#fff"
        },
        tabBar: {
            color: '#999999',
            selectedColor: '#eb5d51',
            backgroundColor: '#ffffff',
            borderStyle: 'white',
            list: [
                {
                    pagePath: 'pages/index/index',
                    text: '福利',
                    iconPath: './assets/image/nav_1.png',
                    selectedIconPath: './assets/image/nav_1_on.png'
                }, {
                    pagePath: 'pages/list/list',
                    text: '列表',
                    iconPath: './assets/image/nav_2.png',
                    selectedIconPath: './assets/image/nav_2_on.png'
                }, {
                    pagePath: 'pages/user/user',
                    text: '我的',
                    iconPath: './assets/image/nav_4.png',
                    selectedIconPath: './assets/image/nav_4_on.png'
                }
            ]
        }

    }

    componentDidMount() { }

    componentDidShow() {
    }

    componentDidHide() { }

    componentDidCatchError() { }

    // 在 App 类中的 render() 函数没有实际作用 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
