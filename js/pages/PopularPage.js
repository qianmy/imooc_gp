/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    FlatList
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            //result: '',
            languages: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    // onLoad() {
    //     let url = this.genUrl(this.text);
    //     this.dataRepository.fetchNetRepository(url)
    //         .then(result => {
    //             this.setState({
    //                 result: JSON.stringify(result)
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 result: JSON.stringify(result)
    //             })
    //         })
    // }

    // genUrl(key) {
    //     return URL + key + QUERY_STR;
    // }

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor='#2196F3'//tabBar背景色
                tabBarInactiveTextColor="mintcream"//未选中状态文字颜色
                tabBaractiveTextColor="#fff"//选中状态文字颜色
                tabBarUnderLineStyle={{backgroundColor: '#e7e7e7', height: 2}}//下划线样式
                renderTabBar={() => <ScrollableTabBar/>}
            >
                {this.state.languages.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <PopularTab key={i} tabLabel={lan.name}>{lan.name}</PopularTab> : null;
                })}
            </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    statusBar={{
                        backgroundColor: '#2196F3'
                    }}
                />
                {/*<Text*/}
                {/*style={styles.tips}*/}
                {/*onPress={() => {*/}
                {/*this.onLoad()*/}
                {/*}}*/}
                {/*>获取数据</Text>*/}
                {/*<TextInput*/}
                {/*style={{height: 33,width:300,borderWidth:1}}*/}
                {/*onChangeText={text => this.text = text}*/}
                {/*/>*/}
                {/*<Text style={{height:500}}>{this.state.result}</Text>*/}
                {content}
            </View>
        )
    }
}

class PopularTab extends Component {//导航下的页面
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.onLoad();
    }

    genUrl(key) {
        return URL + key + QUERY_STR;
    }

    onLoad() {
        this.setState({
            isRefreshing: true
        });
        let url = this.genUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: result.items,
                    isRefreshing: false
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
    }

    _renderRow = ({item}) => {
        return (
            <RepositoryCell item={item}/>
        )
    };

    _keyExtractor = (item, index) => item.id.toString();

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onLoad()}//要用箭头函数
                />
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