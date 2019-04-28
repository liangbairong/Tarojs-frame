import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Form, Button } from '@tarojs/components'
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
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    // 被载入
    componentWillMount() {

    }
    formData(data) {
        console.log(data.detail.formId)
        let temp=data.detail.formId;
        if(temp=='the formId is a mock one'){
            temp=''
        }
        this.props.onCallback(this.props.param,temp)
    }
    render() {
        return (
            <Form className="form" reportSubmit={true} onSubmit={this.formData.bind(this)}>
                <Button formType="submit" className='btn'>Submit</Button>
                {this.props.children}
            </Form>


        )
    }
}

export default Footer
