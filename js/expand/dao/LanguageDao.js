/**
 * Created by qianmaoyin on 2018/10/26.
 */
import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import keys from '../../../res/data/keys.json';

export var FLAG_LANGUAGE = {flag_language: 'flag_language_language', flag_key: 'flag_language_key'};
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result) {
                        try {//解析有可能出错
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }

                    } else {//当用户第一次启动的时候，从数据库中读取不到key对应的内容，就把默认的数据存到数据库中
                        var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }

    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

        })
    }
}