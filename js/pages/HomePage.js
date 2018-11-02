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
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
import Toast,{DURATION} from "react-native-easy-toast";
import WebViewTest from '../../WebViewTest';

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
            this.toast.show(text,DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount(){
        //移除监听
        this.listener&&this.listener.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'td_popular'}
                        selectedTitleStyle={{color: '#6495ED'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#6495ED'}]}
                                                         source={require('../../res/images/ic_polular.png')}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'td_popular'})}>
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color: '#6495ED'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#6495ED'}]}
                                                         source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <AsyncStorageTest/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color: '#6495ED'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#6495ED'}]}
                                                         source={require('../../res/images/ic_favorite.png')}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                        <WebViewTest/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab_my'}
                        selectedTitleStyle={{color: '#6495ED'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#6495ED'}]}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tab_my'})}>
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
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
