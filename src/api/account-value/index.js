import Axios from 'axios'
import InterFace from '../../interface/account-value/index';

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

export function getFanAddV(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanAddV, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getAliveFans(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.aliveFans, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getTrueFans(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.trueFans, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getFanMeasure(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanMeasure, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getFanVerifiedType(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanVerifiedType, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
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

export function getFollowAddV(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followAddV, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getFollowMeasure(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followMeasure, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}


export function getFollowVerifiedType(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followVerifiedType, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);    
        })
    })
}

export function getStatusesTimeline(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.statusesTimeline, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getStatusesActiveTime(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.statusesActiveTime, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

