/**
 * Created by qianmaoyin on 2018/10/11.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';//导入PropTypes
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    StatusBar
}from 'react-native';

//设置一些常量
const NAV_BAR_HAIGHT_ANDROID = 50;//在android下的高度
const NAV_BAR_HAIGHT_IOS = 44;//在ios下的高度
const ATATUS_BAR_HEIGHT = 20;//状态条的高度
const StatusBarShap={//状态栏的约束
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf('default', 'light-content', 'dark-content'),
    hidden:PropTypes.bool
}

export default class NavigationBar extends Component {
    //定义NavigationBar有哪些属性及属性的约束
    static propTypes = {
        //style: View.propTypes.style,//会报错
        style: PropTypes.object,//允许自定义样式使用View的样式
        title: PropTypes.string,//允许传一个string类型的标题
        titleView: PropTypes.element,//title不是文字，是一个下拉框或者别的什么的时候
        hide: PropTypes.bool,//NavigationBar是否隐藏
        leftButton: PropTypes.element,//左侧按钮的约束
        rightButton: PropTypes.element,//右侧按钮的约束
        statusBar:PropTypes.shape(StatusBarShap)//允许用户自定义状态栏，给状态栏一个形状的约束
    };

    static defaultProps = {//定义状态栏默认属性
        statusBar :{
            barStyle:'light-content',
            hidden:false
        }
    }

    constructor(props) {
        super(props);
        this.state = {//用户可以动态设置title和hide，这里给个初始值
            title: '',
            hide: false
        }
    }

    render() {
        //获取状态栏并取出设置的状态栏的样式
        let status = <View style={[styles.statusBar,this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
        </View>

        //获取用户设置的标题，如果用户同时设置了title和titleView，titleView的优先级高
        //如果titleView不为空则直接取出用户设置的titleView作为整个标题部分的视图，
        //如果用户没有设置titleView，这个时候需要包装一下用户传过来的title
        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.title}>{this.props.title}</Text>

        //获取用户传过来的左侧和右侧的按钮以及标题
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>

        return (
            <View style={[styles.container,this.props.style]}>
                {status}
                {content}
            </View>
        )
    }

}

const styles = StyleSheet.create({//设置样式常量
    container: {
        backgroundColor: '#2196F3'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HAIGHT_IOS : NAV_BAR_HAIGHT_ANDROID,
    },
    titleViewContainer: {//title外边容器的样式
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {//title的样式
        fontSize: 20,
        color: '#fff',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? ATATUS_BAR_HEIGHT : 0,
    }
});