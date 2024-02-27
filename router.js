const express= require('express');
const router= express.Router();
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv').config();



//const autorizacion=require('./middleaware/usuario');

const conexion= require('./database/db');

const controladorProductos= require('./controllers/producto');
const controladorCarrito= require('./controllers/carrito');
//const controladorAutor= require('./middleaware/producto');
const controladorAutor= require('./controllers/authController');
const controladorRoles= require('./controllers/roles');
const controladorUsuario= require('./controllers/usuario');
const controladorUsuario_rol= require('./controllers/usuario_rol');

//Mostrar todos los registros para usuario
//router.get('/', controladorProductos.producto);

router.get('/inicio', (req, res)=>{
    user: req.users;
    res.render('inicio', {user: req.session.name});
});


//estableciendo la Ruta inicial

router.get('/', (req, res)=>{

    if(req.session.loggedin){

        res.render('index',{
            login: true,
            name: req.session.name
        });

    }else{
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesion'
        });
    }
});


router.get('/alert', (req, res)=>{
    res.render('alert');
})


router.get('/logout', function(req, res) {

    res.clearCookie('jwt') //borro la cookie
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   
     return res.redirect('login');
    

});







//TRABAJANDO CON USER Y PASSWORD

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.post('/register', async (req, res)=>{

    const user= req.body.user;
    const name= req.body.name;
    const pass= req.body.pass;
    const edad= req.body.edad;
    const correo= req.body.correo;
    const DNI= req.body.DNI;
    const sexo= req.body.sexo;
    const telefono= req.body.telefono;
    const fecha_nacimiento= req.body.fecha_nacimiento;
    let passworDHaash= await bcryptjs.hash(pass, 8);

    conexion.query('INSERT INTO users SET ?', {user:user, name:name, pass:passworDHaash, edad:edad, correo:correo, DNI:DNI, sexo:sexo, telefono:telefono, fecha_nacimiento:fecha_nacimiento}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{

            res.render('register', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Succeful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer:1500,
                ruta:''
               
            });
        }
    });
});

router.post('/auth', async (req, res)=>{

    //const user= req.body.user;
    //const pass= req.body.pass;
    
    const {user, pass}= req.body;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    
    //const users= {user: user}
    //user= {users : users};

    //const accesToken = generateAccessToken(users);

     

    if(user && pass){
        
        conexion.query('SELECT roles.nombre_rol FROM `roles` INNER JOIN users_roles ON users_roles.id_rol=roles.id_rol INNER JOIN users ON users_roles.id_user=users.id WHERE users.user = ?', [user] ,async(error, roles)=>{

            conexion.query('SELECT * FROM users WHERE user = ?', [user], async(error, results)=>{
                
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                
                    res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Usuario y/o password incorecto!",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer:'',
                    ruta:'login'
                    });

                }else{

                


                    req.session.loggedin= true;
                    req.session.name= results[0].name;
                    
                    

                    //const id= results[0].id;
                        
                    const payloat= {

                        id: results[0].id,
                        name: results[0].name,
                        rol: roles
                            
                            
                    }

                    const token= jwt.sign(payloat, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    });

                        //Cookies
                    const cookiesOptions= {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                    }

                    res.cookie('jwt', token, cookiesOptions);

                        res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer:1500,
                        ruta:'inicio',
                        usuario: req.session.name,
                       
                    });

                    
                    


                }
            });

        });

    }else{

        res.render('login', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Por favor ingrese un usuario y/o password!",
        alertIcon: "warning",
        showConfirmButton: true,
        timer:1500,
        ruta:'login'
        });
    } 


});






//TRABAJANDO CON PRODUCTOS

router.get('/admin', (req, res)=>{


    conexion.query('SELECT * FROM producto', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin', {results:results, alert:false});
        }
    });

});

//Crear los Producto
router.get('/create', controladorAutor.rol, (req, res)=> {
    res.render('create', {art:req.art});
});


//Editar Producto
router.get('/edit/:id_producto', controladorAutor.rol, (req, res)=> {

    const id_producto= req.params.id_producto;
    conexion.query('SELECT * FROM producto WHERE id_producto=?' ,[id_producto], (error, results)=>{
       //const art= results[0].user;
        if(error){
            throw error; 
        }else{
            res.render('edit', {user:results[0]});
        }
    });
    
});  

//Eliminar Producto
router.get('/delete/:id_producto', controladorAutor.rol, (req, res)=>{
    const id_producto= req.params.id_producto;
    conexion.query('DELETE FROM producto WHERE id_producto= ?', [id_producto], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/admin');
        }

    });
});






//TRABAJANDO CON ROLES

router.get('/roles', (req, res)=>{
    
    conexion.query('SELECT * FROM roles', (error, results)=>{
        if(error){

            throw error;

        }else{

            const rol = results;
        }
    });


    conexion.query('SELECT * FROM users', (error, results)=>{
        if(error){

            throw error;

        }else{

            const usuarios=results;
            
        }
    });

    res.render('roles', {rol, usuarios, alert:false});
});

//Crear Rol
router.get('/createRol', (req, res)=> {
    res.render('createRol', {art:req.art});
});


//Editar Rol
router.get('/editRol/:id_rol', (req, res)=> {

    const id_rol= req.params.id_rol;

    conexion.query('SELECT * FROM roles WHERE id_rol=?' ,[id_rol], (error, results)=>{
       //const art= results[0].user;
        if(error){
            throw error; 
        }else{
            res.render('editRol', {rol:results[0]});
        }
    });
    
});  

//Eliminar Rol
router.get('/deleteRol/:id_rol', (req, res)=>{
    const id_rol= req.params.id_rol;
    conexion.query('DELETE FROM roles WHERE id_rol= ?', [id_rol], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/roles');
        }

    });
});




//TRABAJANDO CON USUARIOS

router.get('/usuario', controladorAutor.isAuthorizated(["Admin"]), (req, res)=>{
    conexion.query('SELECT * FROM users', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuario', {results:results, alert:false});
        }
    }); 

});

//Crear Usuario
router.get('/createUser', (req, res)=> {
    res.render('createUser', {art:req.art});
});


//Editar Usuario
router.get('/editUser/:id', (req, res)=> {

    const id= req.params.id;

    conexion.query('SELECT * FROM users WHERE id=?' ,[id], (error, results)=>{
       //const art= results[0].user;
        if(error){
            throw error; 
        }else{
            res.render('editUser', {user:results[0]});
        }
    });
    
});  

//Eliminar Usuario
router.get('/deleteUser/:id', (req, res)=>{
    const id= req.params.id;
    conexion.query('DELETE FROM users WHERE id= ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/usuario');
        }

    });
});




//Trabajando con usuarios y roles

router.get('/usuario_rol/:id',(req, res)=>{

    const id= req.params.id;
    
    conexion.query('SELECT roles.nombre_rol, users.user, users_roles.id_UserRol, users.id FROM users_roles INNER JOIN roles ON users_roles.id_rol = roles.id_rol INNER JOIN users ON users.id = users_roles.id_user WHERE users_roles.id_user = ? GROUP BY roles.nombre_rol', [id] ,(error, rol)=>{

        if(error){

            console.log(error);

        }else{

            res.render('usuario_rol', {user: req.session.name , rol, alert:false});
       
        }
    });
});

//res.render('usuario_rol', {results:results, alert:false});

router.get('/createUser_Rol/:id', (req, res)=> {

    const id= req.params.id;
    const id_rol= req.params.id_rol;
    
    conexion.query('SELECT roles.*, users_roles.id_UserRol FROM roles LEFT JOIN users_roles ON roles.id_rol = users_roles.id_rol AND users_roles.id_user = ? WHERE users_roles.id_user IS NULL', [id] ,(error, rol)=>{
        
        if(error){
            throw error;

        }else{

            res.render('createUser_Rol', {user: req.session.name , rol, alert:false});
          
        }
    });

   
   //res.render('createUser_Rol', {rol, usuarios, alert:false});


});
 

//Eliminar Usuario
router.get('/deleteUser_Rol/:id_UserRol', (req, res)=>{

    const id_UserRol= req.params.id_UserRol;

    conexion.query('DELETE FROM users_roles WHERE id_UserRol= ?', [id_UserRol], (error, results)=>{

        if(error){
            throw error;
        }else{
            res.redirect('/usuario');
        }

    });
});





//Trabajando con carrito previo

router.get('/agregarCarritoPrevio/:id_producto/:precioVenta/:cant', (req, res)=>{
    
    //const id_user= req.params.id_user;
    const id_producto= req.params.id_producto;
    const precioVenta= req.params.precioVenta;
    const cant= req.params.cant;
    const subtotal= cant*precioVenta;

    //Capturo el id del usuario
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRETO);
    const id_user = decoded.id;

    
    const sql = 'INSERT INTO carrito_prev (id_user, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)';
    const values = [id_user, id_producto, cant, subtotal]; 

    conexion.query(sql, values, (error, results, fields) => {

        if (error) {

            res.send('Producto ya agregado');
           

            } else {

           res.redirect('/admin');
           
        }
    });


   /*  const sql1 = 'INSERT INTO historial_carrito (id_user, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)';
    const values1 = [id_user, id_producto, cant, subtotal]; 
    conexion.query(sql1, values1, (error, results, fields) => {

        
    }); */
     
        
}); 

router.get('/carritoPrevio',(req, res)=>{

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRETO);
    const id_user = decoded.id;

    conexion.query('SELECT carrito_prev.id_carritoPrevio, carrito_prev.cantidad, carrito_prev.subtotal ,users.user, producto.nombre, producto.tipoProducto, producto.precioVenta FROM users INNER JOIN carrito_prev ON users.id = carrito_prev.id_user INNER JOIN producto ON carrito_prev.id_producto = producto.id_producto WHERE carrito_prev.id_user = ?', [id_user] ,(error, carrito)=>{

        if(error){

            console.log(error);

        }else{

            res.render('carritoPrevio', {user: req.session.name , carrito , alert:false});
       
        }
    });

    

});

router.get('/deleteCarritoPrevio/:id_carritoPrevio', (req, res)=>{

    const id_carritoPrevio= req.params.id_carritoPrevio;

    conexion.query('DELETE FROM carrito_prev WHERE id_carritoPrevio= ?', [id_carritoPrevio], (error, results)=>{

        if(error){
            throw error;
        }else{
            res.redirect('/carritoPrevio');
        }

    });
});



//Trabajando forma pago
router.get('/forma_pago', (req, res)=>{

    conexion.query('SELECT * FROM tipopago',(error, formaPago)=>{

        if(error){

            console.log(error);

        }else{

            res.render('forma_pago', {user: req.session.name , formaPago , alert:false});

        }
    });


}); 


//Trabajando con historial de carritos

router.get('/historialCarrito',(req, res)=>{

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRETO);
    const id_user = decoded.id;

    conexion.query('SELECT carrito_prev.id_carritoPrevio, carrito_prev.cantidad, carrito_prev.subtotal ,users.user, producto.nombre, producto.tipoProducto, producto.precioVenta FROM users INNER JOIN carrito_prev ON users.id = carrito_prev.id_user INNER JOIN producto ON carrito_prev.id_producto = producto.id_producto WHERE carrito_prev.id_user = ?', [id_user] ,(error, carrito)=>{

        if(error){

            console.log(error);

        }else{

            res.render('historialCarrito', {user: req.session.name , carrito , alert:false});
       
        }
    });

});



//Trabajando con factura
router.get('/facturacionPrevia/:selectedOption', (req, res)=>{

    const nombre_formaPago= req.params.selectedOption;

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRETO);
    const id_user = decoded.id;

    

    conexion.query('SELECT carrito_prev.id_carritoPrevio, carrito_prev.cantidad, carrito_prev.subtotal ,users.name, producto.nombre, producto.tipoProducto, producto.precioVenta FROM users INNER JOIN carrito_prev ON users.id = carrito_prev.id_user INNER JOIN producto ON carrito_prev.id_producto = producto.id_producto WHERE carrito_prev.id_user = ?', [id_user] ,(error, facturacion)=>{


        if(error){

            console.log(error);

        }else{


            res.render('facturacionPrevia', {user: req.session.name ,facturacion ,nombre_formaPago, alert:false});
       
        }


    }); 

   

   
});



const { resolveInclude } = require('ejs');
const { sign } = require('jsonwebtoken');

const crud= require('./controllers/crud');
const { carrito } = require('./service/carrito');
router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/updateRol', crud.updateRol);
router.post('/saveRol', crud.saveRol);
router.post('/updateUser', crud.updateUser);
router.post('/saveUser', crud.saveUser);
router.post('/saveUser_Rol', crud.saveUser_rol);
router.post('/updateUser_Rol', crud.updateUser_rol);


module.exports= router;


