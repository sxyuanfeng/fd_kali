import Axios from 'axios'
import InterFace from '../../interface/account-value/index';

export function getAccountValue(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.accountValue, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getMasterBaseInfo(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.masterBaseInfo, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
