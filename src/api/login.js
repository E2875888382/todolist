import Http from '@js/http.js';

export default {
    async sendCode() {
        const res = await Http.get('http://172.22.72.27:8000/getCode');

        return res.data.code;
    },
    async register(registerMsg) {
        if (registerMsg) {
            const res = await Http.get('http://172.22.72.27:8000/register');

            return res.data;
        }
    },
    async getLogin(loginMsg) {
        if (loginMsg) {
            const res = await Http.get('http://172.22.72.27:8000/login');

            return res.data;
        }
    },
    async getAvatar(user) {
        if (user) {
            const res = await Http.get('http://172.22.72.27:8000/getAvatar');

            return res.data.src;
        }
    }
};