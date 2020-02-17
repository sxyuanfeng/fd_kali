import Axios from 'axios'
import InterFace from '../../interface/account-value/index';

export function getFanGender(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanGender, {
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

export function getFollowGender(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followGender, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFollowRank(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followRank, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
