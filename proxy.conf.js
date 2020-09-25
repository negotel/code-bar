const PROXY_CONFIG = [
    {
        context: ['/correios'],
        target:'https://svp.correios.com.br/api/',
        secure: false,
        logLevel: 'debug',
        pathRewrite:{'^/correios': ''}
    }
];


module.exports = PROXY_CONFIG;