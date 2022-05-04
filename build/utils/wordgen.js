"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomStringList = exports.getRandomWordList = void 0;
const axios_1 = __importDefault(require("axios"));
const RANDOM_WORD_URL = 'https://random-word-api.herokuapp.com/word';
function getRandomString(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getRandomWordList(num) {
    return new Promise((resolve, reject) => {
        axios_1.default.get(RANDOM_WORD_URL + '?number=' + num).then(res => {
            resolve(res.data);
        })
            .catch(err => reject(err));
    });
}
exports.getRandomWordList = getRandomWordList;
function getRandomStringList(num, length) {
    const stringList = [];
    for (let i = 0; i < num; i++) {
        stringList.push(getRandomString(length));
    }
    return stringList;
}
exports.getRandomStringList = getRandomStringList;
