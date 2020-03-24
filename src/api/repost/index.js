import Axios from 'axios'
import InterFace from '../../interface/repost/index';

export function getRepostChart(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.repostchart, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getRepostCard(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.repostcard, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
