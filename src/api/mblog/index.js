import Axios from 'axios'
import InterFace from '../../interface/mblog/index';

export function getMblogInfo(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.mblogInfo, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
