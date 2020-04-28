import Axios from 'axios'
import InterFace from '../../interface/covid/index';

export function getCovidTimeline() {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.covidTimeline).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getCovidActiveUser() {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.covidActiveUser).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getCovidOverseaCountry() {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.covidOverseaCountry).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}
