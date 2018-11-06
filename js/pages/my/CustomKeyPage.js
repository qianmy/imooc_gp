/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Navigator,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils  from '../../util/ViewUtils';
import TabNavigator from "react-native-tab-navigator";
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtils from '../../util/ArrayUtils';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.changeValues = [];//保存用户所做的修改
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
        this.state = {
            dataArray: [],
        }
    }

    componentDidMount() {
        this.props.flag ? this.languageDao = new LanguageDao(this.props.flag) : this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }


    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }

        if(this.isRemoveKey){
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changeValues[i]);
            };
        }

        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            return null;//不渲染任何东西
        }
        let len = this.state.dataArray.length;
        let views = [];//每行为一个View，每个View有两个Text
        //每两个元素为一组遍历，如果数组为奇数，i += 2则会少掉数组最后一个元素；
        //如果数组为偶数，i += 2则会少掉数组最后两个元素
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        //将少掉的元素加进来
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null }
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}></View>
            </View>
        );
        return views;
    }

    _onClick(item) {
        if (!this.isRemoveKey) item.checked = !item.checked;

        this.setState({//为了重新渲染
            dataArray: this.state.dataArray,
        });
        ArrayUtils.updateArray(this.changeValues, item);
    }

    renderCheckBox(item) {
        let leftText = item.name;
        let isChecked = this.isRemoveKey ? false : item.checked;//移除页面不给默认值
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this._onClick(item)}
                leftText={leftText}
                isChecked={isChecked}//不写这个选中时，选中状态不显示
                checkedImage={<Image
                    style={{tintColor: '#6495ED'}}
                    source={require('./images/ic_check_box.png')}/>}
                unCheckedImage={<Image
                    style={{tintColor: '#6495ED'}}
                    source={require('./images/ic_check_box_outline_blank.png')}/>}
            />
        )
    }

    onBack() {
        if (this.changeValues.length === 0) {//用户没有做任何修改
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {
                    text: '不保存', onPress: () => {
                    this.props.navigator.pop();
                }, style: 'cancel'
                },
                {
                    text: '保存', onPress: () => {
                    this.onSave();
                }
                }
            ]
        )

    }

    render() {
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.props.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}
        >
            <View style={{margin: 10}}>
                <Text style={styles.title}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    style={{backgroundColor: '#6495ED'}}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
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
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    line: {
        height: 0.5,
        backgroundColor: 'darkgray',

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});