import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Text, Image } from '@tarojs/components'
import { observer, inject, action } from '@tarojs/mobx'
import { myStorage } from '../../uilts/utils'
import './index.scss'
type PageStateProps = {
    appStore: {
        $api: any,
        saveSessionid: Function,
        isSessionid: Function,
        userInfo: any,
        reloadUserInfo: Function,
    }
}

interface Login {
    props: PageStateProps;
    state: any
}

@inject('appStore')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: true, //true 是登录  false: 绑定
            loginBtnState: true, //

            // 注册
            tel: '',
            msgcode: '',
            msgcodeText: '请获取验证码',
            msgcodeState: true,
            submitState: false
        }
    }
    config: Config = {
        navigationBarTitleText: '授权登录',
        enablePullDownRefresh: false,
    }
    // 被载入
    componentWillMount() {
        const { appStore: { isSessionid, userInfo } } = this.props
        if (isSessionid()) {
            if (userInfo.tel) {

            } else {
                this.setState({
                    type: false
                })
            }
        }
    }
    async login(event) {
        const { appStore: { $api, saveSessionid, reloadUserInfo } } = this.props
        this.setState({
            loginBtnState: false
        })
        var loginInfo = await Taro.login();
        var userInfo = await Taro.getUserInfo();
        $api.common.login(loginInfo.code, userInfo.encryptedData, userInfo.iv).then(data => {
            if (data.errcode === 0) {
                saveSessionid(data.data.sessionid);
                reloadUserInfo(() => {
                    Taro.showToast({
                        title: '授权登录成功',
                        icon: 'none',
                        duration: 1000
                    })
                    if (data.data.userinfo.tel) {
                        this.loginSucc();
                    } else {
                        this.setState({
                            type: false,
                        })
                    }
                })

            } else {
                this.setState({
                    loginBtnState: true
                })
            }
        })
    }


    // 注册
    getValue(type, e) {
        if (type == 'tel') {
            this.setState({
                tel: e.detail.value
            }, () => {
                this.ver()
            })
        }
        if (type == 'msgcode') {
            this.setState({
                msgcode: e.detail.value
            }, () => {
                this.ver()
            })
        }
    }
    ver() {
        const { tel, msgcode } = this.state
        this.setState({
            submitState: false
        })
        if (!tel) {
            return
        }
        if (!msgcode) {
            return
        }
        this.setState({
            submitState: true
        })
    }
    // 倒计时
    times() {
        var msgcodeSeconds = 90;
        this.setState({
            msgcodeText: msgcodeSeconds + "s",
            msgcodeState: false
        })
        var msgcodeTimer: any = setInterval(() => {
            msgcodeSeconds--;
            if (msgcodeSeconds <= 0) {
                clearInterval(msgcodeTimer);
                msgcodeTimer = null;
                this.setState({
                    msgcodeText: '重新发送',
                    msgcodeState: true
                })
            } else {
                this.setState({
                    msgcodeText: msgcodeSeconds + "s",
                    msgcodeState: false
                })
            }
        }, 1000);
    }
    getMsgcode() {
        const { tel } = this.state
        const { appStore: { $api } } = this.props
        if (!/^1\d{10}$/.test(tel)) {
            Taro.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 1000
            })
            return;
        }

        $api.common.msgcode("bind", tel).then(data => {
            if (data.errcode === 0) {
                this.times();
            }
        })
    }
    submitForm() {
        const { tel, msgcode } = this.state
        const { appStore: { $api, reloadUserInfo } } = this.props
        this.setState({
            submitState: false
        })
        $api.user.tel_bind(tel, msgcode).then(data => {
            if (data.errcode === 0) {
                reloadUserInfo(() => {
                    Taro.showToast({
                        title: '绑定成功',
                        icon: 'success',
                        duration: 1000,
                    })

                    setTimeout(() => {
                        this.loginSucc();
                    }, 1000)
                })
            } else {
                this.setState({
                    submitState: true
                })
            }
        })
    }
    // 返回上一页
    loginSucc() {
        const pages = {
            'pages/user/user': true,
            'pages/list/list': true,
            'pages/shopping/shopping':true
        }

        let current_page = myStorage.get('current_page')
        if (current_page) {
            let param = ''
            if (current_page.options) {
                param='?'
                for (let i in current_page.options) {
                    param += i + '=' + current_page.options[i] + '&'
                }
            }
            myStorage.remove('current_page')
            console.log(current_page['route'] + param)
            if (pages[current_page['route']]) {
                Taro.switchTab({
                    url: "/" + current_page['route']  + param
                })
            } else {
                Taro.redirectTo({
                    url: "/" + current_page['route']  + param
                })
            }

        } else {
            Taro.navigateBack({
                delta: 1
            })
        }




    }

    render() {
        const { loginBtnState, type, msgcodeText, msgcodeState, tel, msgcode, submitState } = this.state
        return (
            <View className='main' >
                {/* type */}
                {/* 微信授权  */}

                {
                    type && <View className="auth" >
                        <View className='auth_box'>
                            <View className="logo">
                                <Image mode="aspectFit" src={require("../../assets/image/logo.png")} />
                            </View>
                            <View className='btn_box'>
                                <Button className="sub_btn" disabled={!loginBtnState} hoverClass='sub_btn_hover' openType="getUserInfo" onGetUserInfo={this.login.bind(this)}    >
                                    <Image src={require("../../assets/image/wxlogo.png")} mode="aspectFit" className='sub_icon' />
                                    <Text>微信授权登录</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                }

                {/* <!-- 绑定手机号 --> */}

                {
                    !type && <View className="auth" >
                        <View className='auth_box'>
                            <View className="logo">
                                <Image mode="aspectFit" src={require("../../assets/image/logo.png")} />
                            </View>

                            <View className='reg_box'>
                                <View className="PhoneInput">
                                    <Input type="number" value={tel} className='text' placeholder="请输入手机号" maxLength={11} onInput={this.getValue.bind(this, 'tel')} />
                                </View>
                                <View className="PhoneMsgcode">
                                    <Input className='text2' type="number" placeholder="请输入验证码" value={msgcode} maxLength={6} onInput={this.getValue.bind(this, 'msgcode')}
                                    />
                                    <Button className='msgcodeBtn' hoverClass='' disabled={!msgcodeState} onClick={this.getMsgcode.bind(this)}>{msgcodeText}</Button>
                                </View>
                                <Button className="sub_btn subtop" hoverClass='sub_btn_hover' disabled={!submitState} onClick={this.submitForm.bind(this)}>
                                    绑定
                            </Button>
                            </View>
                        </View>

                    </View>
                }




            </View >
        )
    }
}

export default Login
