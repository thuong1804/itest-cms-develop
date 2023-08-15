const path = require('path');
module.exports = {
    style: {
        css: {
            loaderOptions: {
                modules: {
                    auto: true,
                    exportLocalsConvention: 'camelCaseOnly',
                },
            },
        },
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
};