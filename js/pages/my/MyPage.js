/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Navigator
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';

export default class MyPage extends Component {


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    style={{backgroundColor: '#6495ED'}}
                />
                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.props.navigator.push({
                            component: CustomKeyPage,
                            params: {...this.props}
                        })
                    }}
                >自定义标签</Text>
                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.props.navigator.push({
                            component: SortKeyPage,
                            params: {...this.props}
                        })
                    }}
                >标签排序</Text>
                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.props.navigator.push({
                            component: CustomKeyPage,
                            params: {
                                ...this.props,
                                isRemoveKey:true
                            }
                        })
                    }}
                >标签移除</Text>
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
});