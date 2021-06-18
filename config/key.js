if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // we are in development - return the dev keys!!!
    module.exports = require('./dev');
}

module.exports = {
  mongoURI : 'mongodb+srv://neelvadgama08:Neel@1272@cluster0.vd7dy.mongodb.net/myDB?retryWrites=true&w=majority',
  cookiekey: 'q874yqeuiqhkehq834',
  secret: 'sdjakfkdjfakd',
}

/* 
  mongoURI : 'mongodb+srv://maitrik:tpj655@Mp@tpj655.jlns7.mongodb.net/maitrik?retryWrites=true&w=majority',
  
*/