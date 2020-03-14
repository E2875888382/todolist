import Http from '@js/http.js';

export default {
    async sendCode() {
        const res = await Http.get('getCode');

        return res.data.code;
    },
    async register(registerMsg) {
        if (registerMsg) {
            const res = await Http.get('register');

            return res.data;
        }
    },
    async getLogin(loginMsg) {
        if (loginMsg) {
            const res = await Http.get('login');

            return res.data;
        }
    },
    async getAvatar(user) {
        if (user) {
            const res = await Http.get('getAvatar');

            return res.data.src;
        }
    }
};