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

export function getParticipantRepostFrom(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostFrom, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getParticipantRepostVerified(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostVerified, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getParticipantRepostGender(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostGender, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getParticipantRepostAddv(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostAddv, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getParticipantRepostTrue(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostTrue, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getParticipantRepostMeasure(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.participantRepostMeasure, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadTimeline(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadTimeline, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadRepostRelative(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadRepostRelative, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadRepostDeep(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadRepostDeep, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadRepostKeyuser(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadRepostKeyuser, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadRepostKeyuserRoad(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadRepostKeyuserRoad, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadRepostBoom(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadRepostBoom, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getSpreadOverview(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.spreadOverview, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function getRepostWordcloud(params) {
    return new Promise((resolve, reject) => {
        Axios.get(InterFace.repostWordcloud, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

