const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/**', { target: 'https://festival-du-jeu-api.herokuapp.com/' }));
};
