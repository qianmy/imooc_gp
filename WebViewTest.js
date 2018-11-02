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
import NavigationBar from './js/common/NavigationBar';

//设置一个WebView默认加载的url
const URL = 'http://baidu.com';

export default class WebViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '',
            canGoBack: false
        }
    }

    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        }else {
            DeviceEventEmitter.emit('showToast','到顶了');
        }
    }

    go() {
        this.setState({
            url: this.text
        })
    }

    onNavigationStateChange(e) {//当导航状态发生变化的时候调用。
        this.setState({
            title: e.title,
            canGoBack: e.canGoBack
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView使用'}
                    style={{
                        backgroundColor: '#6495ED'
                    }}
                    statusBar={{
                        backgroundColor: '#6495ED',
                    }}
                />
                <View style={styles.row}>
                    <Text
                        style={styles.text}
                        onPress={() => {
                            this.goBack()
                        }}
                    >返回</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={URL}
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