/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy';
import ListViewTest from './ListViewTest';


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'td_popular',//初始化selectedTab，默认显示'td_popular'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<TabNavigator>
                 <TabNavigator.Item
                 selected={this.state.selectedTab === 'td_popular'}
                 selectedTitleStyle={{color:'red'}}
                 title="最热"
                 renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
                 renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}
                 badgeText="1"
                 onPress={() => this.setState({selectedTab: 'td_popular'})}>
                 <View style={styles.page1}></View>
                 </TabNavigator.Item>
                 <TabNavigator.Item
                 selected={this.state.selectedTab === 'tb_trending'}
                 selectedTitleStyle={{color:'yellow'}}
                 title="趋势"
                 renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')}/>}
                 renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')}/>}
                 onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                 <View style={styles.page2}></View>
                 </TabNavigator.Item>
                 <TabNavigator.Item
                 selected={this.state.selectedTab === 'tb_favorite'}
                 selectedTitleStyle={{color:'red'}}
                 title="收藏"
                 renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
                 renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}
                 badgeText="1"
                 onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                 <View style={styles.page1}></View>
                 </TabNavigator.Item>
                 <TabNavigator.Item
                 selected={this.state.selectedTab === 'tab_my'}
                 selectedTitleStyle={{color:'yellow'}}
                 title="我的"
                 renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')}/>}
                 renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')}/>}
                 onPress={() => this.setState({selectedTab: 'tab_my'})}>
                 <View style={styles.page2}></View>
                 </TabNavigator.Item>
                 </TabNavigator>
                <Navigator
                    initialRoute={{
                        component: Boy
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component navigator={navigator} {...route.params}/>
                    }}
                />*/}
                <ListViewTest/>
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
