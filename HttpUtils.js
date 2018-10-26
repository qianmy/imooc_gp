/**
 * Created by qianmaoyin on 2018/10/26.
 */

//不需要导入额外的一些东西
export default class HttpUtils {//把HttpUtils导出，以方便其他模块中去用

    //get请求
    static get(url) {
        //向调用者返回一个promise，来将服务器返回的信息告诉调用者
        //Promise有两个参数resolve,reject
        return new Promise((resolve, reject) => {
            fetch(url)//向服务器发送get请求
                .then(response => response.json())//获取服务器返回的结果，获取json类型的数据
                .then(result => {
                    resolve(result);//服务器成功返回数据
                })//将json类型的数据返回给调用者
                .catch(error => {//发生错误
                    reject(error);
                })
        })
    }

    //post请求
    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application.json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())//获取服务器返回的结果，获取json类型的数据
                .then(result => {
                    resolve(result);//服务器成功返回数据
                })//将json类型的数据返回给调用者
                .catch(error => {//发生错误
                    reject(error);
                })
        })
    }
}