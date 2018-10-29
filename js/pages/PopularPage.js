/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: ''
        }
    }

    onLoad() {
        let url = this.genUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
    }

    genUrl(key) {
        return URL + key + QUERY_STR;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                />
                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.onLoad()
                    }}
                >获取数据</Text>
                <TextInput
                    style={{height: 33,width:300,borderWidth:1}}
                    onChangeText={text => this.text = text}
                />
                <Text style={{height:500}}>{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tips: {
        fontSize: 29
    }
})