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
import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const KEY = 'text';

export default class AsyncStorageTest extends Component {
    constructor(props) {
        super(props);
    }

    onSave() {//保存
        AsyncStorage.setItem(KEY, this.text, (error) => {//key值，value值，回调函数
            if (!error) {//如果没有错误
                this.toast.show('保存成功', DURATION.LENGTH_SHORT);
            } else {
                this.toast.show('保存失败', DURATION.LENGTH_SHORT);
            }
        })
    }

    onRemove() {//移除
        AsyncStorage.removeItem(KEY, (error) => {//key值，回调函数
            if (!error) {
                this.toast.show('移除成功', DURATION.LENGTH_SHORT);
            } else {
                this.toast.show('移除失败', DURATION.LENGTH_SHORT);
            }
        })
    }

    onFetch() {//取出
        AsyncStorage.getItem(KEY, (error, result) => {//key值，回调函数
            if (!error) {//如果没有错误
                if (result !== '' && result !== null) {
                    this.toast.show(`取出的内容为：${result}`);
                } else {
                    this.toast.show('取出的内容不存在');
                }

            } else {
                this.toast.show('取出失败');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'AsyncStorageTest的基本使用'}
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
                        onPress={() => this.onSave()}
                    >保存</Text>
                    <Text
                        style={styles.text}
                        onPress={() => this.onRemove()}
                    >移除</Text>
                    <Text
                        style={styles.text}
                        onPress={() => this.onFetch()}
                    >取出</Text>
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