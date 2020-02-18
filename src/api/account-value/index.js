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

export function getFanRank(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanRank, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFollowFollowCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followFollowCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFollowFollowerCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followFollowerCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFanFollowCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanFollowCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFanFollowerCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanFollowerCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFollowStatusCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.followStatusCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getFanStatusCount(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.fanStatusCount, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

