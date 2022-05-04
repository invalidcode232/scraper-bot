"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const axios_1 = __importDefault(require("axios"));
function isValidId(type, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessage = type === 'group'
            ? 'No group could be retrieved for the given URL.' : 'The specified profile could not be found.';
        let res = yield axios_1.default.get('https://steamcommunity.com/' + (type === 'group' ? 'groups' : 'id') + '/' + id);
        if (res.status !== 200) {
            return false;
        }
        return res.data.search(errorMessage) !== -1;
    });
}
exports.isValidId = isValidId;
