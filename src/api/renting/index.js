import Axios from 'axios'
import InterFace from '../../interface/renting/index';

export function getCountryCityRenting() {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.countryCityRenting).then(
            res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            })
    })
}

export function getRentingWordcloud(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.rentingWordcloud, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getRentingHuntingList(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.rentingHuntingList, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getRentingOutList(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.rentingOutList, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

