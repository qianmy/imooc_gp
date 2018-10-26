/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import WelcomePage from './WelcomePage';

function setup(){
    //进行一些初始化配置

    class Root extends Component{//创建根组件
        renderScence(route,navigator){
            let Component =  route.component;
            return <Component {...route.params} navigator={navigator}/>
        }
        render(){
            return <Navigator
                initialRoute={{component:WelcomePage}}
                renderScene={(route,navigator)=>this.renderScence(route,navigator)}
            />
        }
    }

    return <Root/>

}

module.exports = setup;