import BaseModelRequest from '../libs/BaseModelRequest';
import AppConfig from '../utils/AppConfig';

export default class HomeRequest extends BaseModelRequest {
    getModelName() {
        return 'home';
    }

    getBookList(params) {
        const url = '/book/list';
        return this.get(url, params);
    }

    bookCheck(params) {
        const url = '/transaction/check';
        return this.post(url, params);
    }

    getBookDetail(id) {
        const url = '/book/get/'+id;
        return this.get(url);
    }

    bookCreate(params) {
        const url = '/transaction/create';
        return this.post(url, params);
    }

    bookReturn(params) {
        const url = '/transaction/return';
        return this.put(url, params);
    }


}
