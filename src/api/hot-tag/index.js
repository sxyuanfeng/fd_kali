import Axios from 'axios'
import InterFace from '../../interface/hot-tag/index';

export function getHotTag(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.hottag, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
