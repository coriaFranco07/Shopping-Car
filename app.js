const { json } = require('express');
const express= require('express');
const jwt= require('jsonwebtoken');
const cookieParser= require('cookie-parser')

//invocamos a bcryptjs
const bcryptjs= require('bcryptjs');

//var de session
const session= require('express-session');


const app= express();

//establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

//seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//invocamos dotenv
const dotenv= require('dotenv');
//seteamos variables de entorno
dotenv.config({path:'./env/.env'});

//directorio public 
app.use('/resources', express.static('public'));
app.use('resources', express.static(__dirname + '/public'));


//seteamos la carpeta public para archivos estaticos
app.use(express.static('public'));

//para poder trabajar con las cookies
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use('/', require('./router'));

//Para eliminar el cache y que no se pueda volver con el boton de back luego de que hacemos LOGOUT
app.use( function(req, res, next) {
    if(!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});


app.listen(5000, ()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});





