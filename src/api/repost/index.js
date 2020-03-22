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
