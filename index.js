let express =require('express');
let config =require("config");
let port = config.get('port')
let session =require('express-session');
const { routes } = require('./routes');
let app =express();
app.use(session({
    secret:'@#$12'
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use(routes);





app.listen(port,()=>{console.log('active',port)
});