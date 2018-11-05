/**
 * Created by qianmaoyin on 2018/10/11.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput
}from 'react-native';
import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import GitHubTrending from 'GitHubTrending';

const URL = 'http://github.com/trending/';
export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        this.trending = new GitHubTrending();
        this.state = {
            result: ''
        }
    }

    onLoad() {
        let url = URL + this.text;
        this.trending.fetchTrending(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'GitHubTrending的使用'}
                    style={{
                        backgroundColor: '#6495ED'
                    }}
                />
                <TextInput
                    style={{borderWidth: 1, height: 40, margin: 6}}
                    onChangeText={text => this.text = text}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={styles.text}
                        onPress={() => this.onLoad()}
                    >加载数据</Text>
                    <Text style={{flex:1}}>{this.state.result}</Text>
                </View>
                <Toast
                    ref={toast => this.toast = toast}
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
        fontSize: 20,
        margin: 5
    }
});