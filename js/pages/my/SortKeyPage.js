/**
 * Created by qianmaoyin on 2018/10/26.
 */
/*
 *   已订阅的标签排序
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Navigator,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from '../../util/ViewUtils';

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];//从数据库中读取的所有标签的数组
        this.sortResultArray = [];//排序之后新生的所有标签的数组
        this.originalCheckedArray = [];//上一次已经订阅的标签
        this.state = {
            checkedArray: [],//已经订阅的标签
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }

    loadData() {//读取数据库的标签
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItems(result);
            })
            .catch(error => {

            })
    }

    getCheckedItems(result) {//筛选出用户已经订阅的标签
        this.dataArray = result;//将最初获取的数据记录一份，用于在点击'保存'的时候进行对比
        let checkedArray = [];//用于保存用户已经订阅的标签
        for (let i = 0, len = result.length; i < len; i++) {
            let data = result[i];
            if (data.checked) checkedArray.push(data);//如果用户订阅了这个标签
        }
        this.setState({
            checkedArray: checkedArray
        })
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);//将checkedArray克隆了一份
    }

    onBack() {
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改吗？',
            [
                {
                    text: '否', onPress: () => {
                    this.props.navigator.pop();
                }, style: 'cancel'
                },
                {
                    text: '是', onPress: () => {
                    this.onSave(true);
                }
                }
            ]
        )
    };

    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        this.geSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }

    geSortResult() {//获取重新排序之后的所有标签
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, l = this.originalCheckedArray.length; i < l; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);//获取在原始数组中的索引
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    render() {
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}
        >
            <View style={{margin: 10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />
                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row}/>}//自定义的组件，用来显示每一行
                />
            </View>
        )
    }
}

class SortCell extends Component {
    render() {
        return (
            //Touchable...组件里面只能包裹一个元素
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image
                        style={styles.image}
                        source={require('./images/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
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
    item: {
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        tintColor: '#2196F3',
        height: 16,
        width: 16,
        marginRight: 10
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
});