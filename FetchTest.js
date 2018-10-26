/**
 * Created by qianmaoyin on 2018/10/11.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
}from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import HttpUtils from './HttpUtils';

export default class FetchTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        }
    }

    onLoad(url) {//通过fetch发送get请求
        // fetch(url)
        //     .then(response => response.json())//解析它的json
        //     .then(result => {
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     })//获取解析出来的json数据，把result在页面中显示出来
        //     .catch(error => {
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        //     })

        HttpUtils.get(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    onSubmit(url, data) {//通过fetch发送post请求
        // fetch(url, {
        //     method: 'POST',
        //     header: {
        //         'Accept': 'application/json',//告诉服务器前端接受的返回数据的类型
        //         'Content-Type': 'application/json',//提交数据的格式
        //     },
        //     body: JSON.stringify(data)//提交的数据
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     })
        //     .catch(error => {//捕捉错误
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        //     })

        HttpUtils.post(url, data)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Fetch的使用'}
                />
                <Text
                    style={styles.text}
                    onPress={() => {
                        this.onLoad('https://www.easy-mock.com/mock/5bd26f112d219744ff8495ad/example/FetchTest/getData')
                    }}
                >
                    获取数据
                </Text>
                <Text
                    style={styles.text}
                    onPress={() => {
                        this.onSubmit(
                            'https://www.easy-mock.com/mock/5bd26f112d219744ff8495ad/example/fetchTest/submit',
                            {userName: '小明', passWord: '123456'})
                    }}
                >
                    提交数据
                </Text>
                <Text
                    style={styles.text}
                >返回结果：{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 22
    }
});