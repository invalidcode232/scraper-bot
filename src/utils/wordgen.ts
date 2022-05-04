import axios from 'axios'

const RANDOM_WORD_URL = 'https://random-word-api.herokuapp.com/word'

function getRandomString(length: number) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getRandomWordList(num: number) {
    return new Promise((resolve, reject) => {
        axios.get(RANDOM_WORD_URL + '?number=' + num).then(res => {
            resolve(res.data)
        })
            .catch(err => reject(err))
    })
}

function getRandomStringList(num: number, length: number) {
    const stringList = [];
    for (let i = 0; i < num; i++) {
        stringList.push(getRandomString(length))
    }

    return stringList;
}

export { getRandomWordList, getRandomStringList }