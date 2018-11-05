/**
 * Created by qianmaoyin on 2018/10/26.
 */
import {
    AsyncStorage
} from 'react-native';
import GitHubTrending from 'GitHubTrending';

export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};
export default class DataRepository {
    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) this.trending = new GitHubTrending();
    }

    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            //获取本地的数据
            this.fetchLocalRepository(url)
                .then(result => {
                    if (result) {
                        resolve(result);
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(e => {
                                reject(e);
                            })
                    }
                })
                .catch(e => {//获取本地数据出错，获取网络数据
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e => {
                            reject(e);
                        })
                })
        })
    }

    /*
     * 获取本地的数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {//转换的时候，如果存储的JSON格式不正确会报错
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {//如果从本地获取数据失败
                    reject(e);
                }
            })

        })
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.trending.fetchTrending(url)
                    .then(result => {
                        if (!result) {//result为空
                            reject(new Error('responseData is null'));
                            return;
                        }
                        //result不为空
                        resolve(result);
                        this.saveRepository(url, result);
                    })
            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result.items);
                        this.saveRepository(url, result.items);//获取网络数据成功，保存一份到本地
                    })
                    .catch(error => {
                        reject(error);
                    })
            }

        })
    }

    saveRepository(url, items, callBack) {//保存到数据库
        if (!url || !items) return;
        let wrapData = {items: items, update_date: new Date().getTime()};//每次保存的数据给个时间戳
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
    }

    /*
     * 判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean}
     * */
    checkData(longTime) {
        let cDate = new Date();//当前日期
        let tDate = new Date();
        tDate.setTime(longTime);//目标日期
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;//设置4个小时过时
        return true;
    }
}