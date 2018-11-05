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
import NavigationBar from '../common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository';

const URL = 'http://github.com/trending/';
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result: ''
        }
    }

    onLoad() {
        let url = URL + this.text;
        this.dataRepository.fetchRepository(url)
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
                    title={'趋势'}
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