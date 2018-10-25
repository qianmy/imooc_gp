/**
 * Created by qianmaoyin on 2018/10/11.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl
}from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const data = {
    'result': [
        {
            'email': 's.defef@df.net',
            'fullName': '张三张三'
        },
        {
            'email': 's.defvff@vfvf.net',
            'fullName': '张三张三张三'
        },
        {
            'email': 's.dfvfvef@fvf.net',
            'fullName': '张三张三张三张三'
        }, {
            'email': 'sv.dfvef@f.net',
            'fullName': '张三张三张三张三张三'
        }, {
            'email': 'v.defv@df.net',
            'fullName': '里斯'
        },
        {
            'email': 'svf.fef@df.net',
            'fullName': '张三里斯张三'
        }, {
            'email': 's.dvfvfef@df.net',
            'fullName': '张三张三里斯'
        }, {
            'email': 's.devff@df.net',
            'fullName': '里斯张三张三'
        }, {
            'email': 's.defef@dss.net',
            'fullName': '里斯里斯张三张三'
        }, {
            'email': 's.daaaf@df.net',
            'fullName': '里斯里斯里斯张三张三'
        }, {
            'email': 's.dedddf@df.net',
            'fullName': '里斯里斯张三里斯张三'
        }
    ]
}


export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        //当r1 !== r2不相等的时候，让ListView重新渲染数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(data.result),//将要渲染的数据与dataSource关联起来
            isLoading:true
        }
        this.onLoad();
    }

    _renderRow(item) {//每行的渲染
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={()=>{
                        this.toast.show(`你单击了：${item.fullName}`,DURATION.LENGTH_SHORT)
                    }}
                >
                    <Text style={styles.text}>{item.fullName}</Text>
                    <Text style={styles.text}>{item.email}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHightlighted) {//分割线，会自己带过来一些参数
        return <View key={rowID} style={styles.line}></View>
    }

    _renderFooter() {//底部视图（页脚）
        //Image如果是渲染的网络图片，需要给宽高才会显示
        return <Image
            style={{width: 400, height: 100}}
            source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}/>
    }

    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },5000)
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'ListViewTest'}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHightlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHightlighted)}
                    renderFooter={() => this._renderFooter()}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onLoad()}
                    />}
                />
                <Toast ref={toast=>{this.toast=toast}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 18
    },
    row: {
        height: 50
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    }
});