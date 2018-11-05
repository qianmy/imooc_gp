/**
 * Created by qianmaoyin on 2018/10/11.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter
}from 'react-native';
import NavigationBar from '../../js/common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

//设置一个WebView默认加载的url
const URL = 'http://baidu.com';

const TRENDING_URL = 'https://github.com/';
export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL + this.props.item.fullName;
        let title = this.props.item.full_name ? this.props.item.full_name : this.props.item.fullName;
        this.state = {
            url: this.url,
            title: title,
            canGoBack: false
        }
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
            this.props.navigator.pop();
        }
    }

    go() {
        this.setState({
            url: this.text
        })
    }

    onNavigationStateChange(e) {//当导航状态发生变化的时候调用。
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor: '#6495ED'
                    }}
                    statusBar={{
                        backgroundColor: '#6495ED',
                    }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                />
                <View style={styles.row}>
                    <Text
                        style={styles.text}
                        onPress={() => {
                            this.onBack()
                        }}
                    >返回</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={this.state.url}
                        onChangeText={text => this.text = text}//获取用户输入的网址
                    />
                    <Text
                        style={styles.text}
                        onPress={() => {
                            this.go()
                        }}
                    >前往</Text>
                </View>
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri: this.state.url}}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    startInLoadingState={true}//进度条
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        margin: 2
    }
});