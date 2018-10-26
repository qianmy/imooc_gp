/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Navigator
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {//暂停两秒跳转到首页
            this.props.navigator.resetTo({//从欢迎页开始重置栈中的路由，让首页称为栈中的第一页
                component: HomePage
            })
        }, 2000);
    }

    //因为使用了计时器，如果组件卸载的时候，定时器还没有结束，有可能会报一些异常
    //为了防止这个异常，在组件卸载的时候，清除这个计时器
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View>
                <NavigationBar
                    title={'欢迎'}
                />
                <Text>欢迎👏</Text>
            </View>
        )
    }
}