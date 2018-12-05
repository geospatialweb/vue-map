'use strict';

module.exports = {
    productionTip: false,
    devServer: {
        proxy: {
            '/data': {
                target: 'http://localhost:80'
            }
        }
    }
}
