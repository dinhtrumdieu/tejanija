import BaseModelRequest from '../libs/BaseModelRequest';
import AppConfig from '../utils/AppConfig';

export default class UserRequest extends BaseModelRequest {

    getModelName() {
        return 'users';
    }

    login(username, password) {
        const params = {
            username,
            password,
        };
        return this.post('/login', params);
    }

    getUser(id, params) {
        const url = '/public/user/' + id;
        return this.get(url, params, true);
    }

    getCurrentUser() {
        const url = '/security/user/profile';
        return this.get(url);
    }

    getTransactionsHistory(status, username) {
        const url = '/transaction/history';
        return this.get(url, {status, username});
    }

}
