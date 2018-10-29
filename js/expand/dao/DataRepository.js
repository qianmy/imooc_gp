/**
 * Created by qianmaoyin on 2018/10/26.
 */

export default class DataRepository{
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }
}