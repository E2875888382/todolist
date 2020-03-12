// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px2rem-exclude': {
            remUnit: 100,
            remPrecision: 4,
            exclude: /node_modules/
        }
    }
};