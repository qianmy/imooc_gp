/**
 * Created by qianmaoyin on 2018/10/26.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View, DeviceEventEmitter} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import TrendingPage2 from './TrendingPage2';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
import Toast, {DURATION} from "react-native-easy-toast";
import WebViewTest from '../../WebViewTest';
import TrendingTest from '../../TrendingTest';

type Props = {};
export default class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'td_popular',//初始化selectedTab，默认显示'td_popular'
        }
    }

    componentDidMount() {
        //组件完成加载的时候，注册一个通知
        //其它页面发出这个通知的时候，接受一个text
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount() {
        //移除监听
        this.listener && this.listener.remove();
    }

    _renderTab(Component, selectTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectTab}
                selectedTitleStyle={{color: '#6495ED'}}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#6495ED'}]}
                                                 source={renderIcon}/>}
                badgeText="1"
                onPress={() => this.setState({selectedTab: selectTab})}>
                <Component {...this.props}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(PopularPage, 'td_popular', "最热", require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage2, 'tb_trending', "趋势", require('../../res/images/ic_trending.png'))}
                    {this._renderTab(WebViewTest, 'tb_favorite', "收藏", require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MyPage, 'tab_my', "我的", require('../../res/images/ic_my.png'))}
                </TabNavigator>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    image: {
        width: 22,
        height: 22
    }
});
