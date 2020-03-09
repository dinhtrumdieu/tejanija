import AppConfig from '../utils/AppConfig';
import I18n from '../i18n/i18n';

export default class BaseRequest {
    async get(url, params = {}) {
        // remove undefined field
        Object.keys(params).forEach((key) => {
            if (typeof params[key] === 'undefined') {
                delete params[key];
            }
        });
        const query = Object.keys(params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&');
        const fullUrl = `${this._getFullUrl(url)}?${query}`;
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: this._getHeader(),
        });
        this._logRequest('GET', url, params);
        return await this._processResponse(response, url);
    }

    async put(url, params = {}) {
        const response = await fetch(this._getFullUrl(url), {
            method: 'PUT',
            headers: this._getHeader(),
            body: JSON.stringify(params),
        });
        this._logRequest('PUT', url, params);
        return await this._processResponse(response, url);
    }

    async post(url, params = {}) {
        const response = await fetch(this._getFullUrl(url), {
            method: 'POST',
            headers: this._getHeader(),
            body: JSON.stringify(params),
        });
        this._logRequest('POST', url, params);
        return await this._processResponse(response, url);
    }

    async del(url, params = {}) {
        params.lang = I18n.locale;
        const response = await fetch(this._getFullUrl(url), {
            method: 'DELETE',
            headers: this._getHeader(),
        });
        this._logRequest('DELETE', url, params);
        return await this._processResponse(response, url);
    }

    async upload_file(url, body) {
        const response = await fetch(this._getFullUrl(url), {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                Authorization: `Bearer ${AppConfig.ACCESS_TOKEN}`,
            },
            body: body,
        });
        return await this._processUploadImageResponse(response, url);
    };

    _getFullUrl(url) {
        return `${AppConfig.getApiServer()}${url}`;
    }

    _getFullPath(url) {
        return `/api/${AppConfig.getApiVersion()}${url}`;
    }

    _getHeader() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //   Authorization: `${AppConfig.ACCESS_TOKEN}`,
        };
    }

    async _processResponse(response, url) {
        await this._checkResponseCode(response, url);

        const content = await response.text();
        let data;
        try {
            data = content ? JSON.parse(content) : {};
            if (data.error === true) {
                throw data;
            }
            // this._logResponse(response.status, data);
        } catch (error) {
            //this._logResponse(response.status, content);
            throw error;
        }
        return data.data;
    }

    async _processLoginResponse(response, url) {
        await this._checkResponseCode(response, url);

        const content = await response.text();
        let data;
        try {
            data = content ? JSON.parse(content) : {};
            // this._logResponse(response.status, data);
        } catch (error) {
            //this._logResponse(response.status, content);
            throw error;
        }

        return data;
    }

    async _processUploadImageResponse(response, url) {
        await this._checkResponseCode(response, url);

        const content = await response.text();
        let data;
        try {
            data = content ? JSON.parse(content) : {};
            // this._logResponse(response.status, data);
        } catch (error) {
            //this._logResponse(response.status, content);
            throw error;
        }

        return data;
    }

    async _checkResponseCode(response, url) {
        if (!response.ok) {
            const content = await response.text();
            let data;
            try {
                data = response ? JSON.parse(content) : {};
                // this._logResponse(response.status, data);
            } catch (error) {
                // this._logResponse(response.status, content);
                throw content;
            }
            throw data;
        }
    }

    _logRequest(method, url, params) {
        if (__DEV__) {
            console.log(`${method}: ${url}`, params);
        }
    }

    _logResponse(responseCode, data) {
        if (__DEV__) {
            console.log(responseCode, data);
        }
    }
}
