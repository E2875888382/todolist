import Http from '@js/http.js';

export default {
    async sendCode() {
        const res = await Http.get('getCode');

        return res.data.code;
    },
    async register(registerMsg) {
        if (registerMsg) {
            const res = await Http.post('register', registerMsg);

            return res.data;
        }
    },
    async getLogin(loginMsg) {
        if (loginMsg) {
            const res = await Http.post('login', loginMsg);

            localStorage.setItem('token', res.data.token);
            return res.data;
        }
    },
    async getAvatar(user) {
        if (user) {
            const res = await Http.post('getAvatar', {user: user});

            return res.data.avatar;
        }
    },
    async update({name, theme, avatar}) {
        const res = await Http.post('update', {
            name: name,
            theme: theme,
            avatar: avatar
        });

        return res.data;
    }
};