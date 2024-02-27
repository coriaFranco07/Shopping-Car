const conexion =require('../database/db');
const { use } = require('../router');


exports.save= (req, res)=>{
    
    const tipoProducto= req.body.tipoProducto;
    const nombre= req.body.nombre;
    const codigo= req.body.codigo;
    const stock= req.body.stock;
    const precioVenta= req.body.precioVenta;

    
    conexion.query('INSERT INTO producto SET ?', {tipoProducto:tipoProducto, nombre:nombre, codigo:codigo, stock:stock, precioVenta:precioVenta}, (error, results)=>{

        if(error){
            console.log('error');
        }else{
            res.redirect('/admin');
        }

    });

    

};


exports.update= (req, res)=>{

    const id_producto= req.body.id_producto;
    const tipoProducto= req.body.tipoProducto;
    const nombre= req.body.nombre;
    const codigo= req.body.codigo;
    const stock= req.body.stock;
    const precioVenta= req.body.precioVenta;

    conexion.query('UPDATE producto SET ? WHERE id_producto= ?', [{tipoProducto:tipoProducto, nombre:nombre, codigo:codigo, stock:stock, precioVenta:precioVenta}, id_producto], (error, results)=>{
            
        if(error){
            console.log('error');
        }else{
            res.redirect('/admin');
        }

    });
}  





exports.saveRol= (req, res)=>{
    
    const nombre_rol= req.body.nombre_rol;
    

    
    conexion.query('INSERT INTO roles SET ?', {nombre_rol:nombre_rol}, (error, results)=>{

        if(error){
            console.log('error');
        }else{
            res.redirect('/roles');
        }

    });

    

};


exports.updateRol= (req, res)=>{

    const id_rol= req.body.id_rol;
    const nombre_rol= req.body.nombre_rol;
    

    conexion.query('UPDATE roles SET ? WHERE id_rol= ?', [{nombre_rol:nombre_rol}, id_rol], (error, results)=>{
            
        if(error){
            console.log('error');
        }else{
            res.redirect('/roles');
        }

    });
}  





exports.saveUser= (req, res)=>{
    
    const user= req.body.user;
    const name= req.body.name;
    const pass= req.body.pass;
    const edad= req.body.edad;
    const correo= req.body.correo;
    const DNI= req.body.DNI;
    const sexo= req.body.sexo;
    const telefono= req.body.telefono;
    const fecha_nacimiento= req.body.fecha_nacimiento;
    

    
    conexion.query('INSERT INTO users SET ?', {user:user, name:name, pass:pass, edad:edad, correo:correo, DNI:DNI, sexo:sexo, telefono:telefono, fecha_nacimiento:fecha_nacimiento}, (error, results)=>{

        if(error){
            console.log('error');
        }else{
            res.redirect('/usuario');
        }

    });

    

};


exports.updateUser= (req, res)=>{

    const id= req.body.id;
    const user= req.body.user;
    const name= req.body.name;
    const pass= req.body.pass;
    const edad= req.body.edad;
    const correo= req.body.correo;
    const DNI= req.body.DNI;
    const sexo= req.body.sexo;
    const telefono= req.body.telefono;
    const fecha_nacimiento= req.body.fecha_nacimiento;

    

    conexion.query('UPDATE users SET ? WHERE id= ?', [{user:user, name:name, pass:pass, edad:edad, correo:correo, DNI:DNI, sexo:sexo, telefono:telefono, fecha_nacimiento:fecha_nacimiento}, id], (error, results)=>{
            
        if(error){
            console.log('error');
        }else{
            res.redirect('/usuario');
        }

    });
}  





exports.saveUser_rol= (req, res)=>{
    
    const id_user= parseInt(req.body.user);
    const id_rol= parseInt(req.body.name_rol);
   
    
    
    conexion.query('INSERT INTO users_roles SET ?', {id_user:id_user, id_rol:id_rol}, (error, results)=>{

        if(error){

            res.redirect('./alert');
            
        }else{
            res.redirect('/usuario');
        }

    });

   //res.send('hasta aca llegamos')

};


exports.updateUser_rol= (req, res)=>{

    const id_UserRol= req.body.id_UserRol;
    const user= req.body.user;
    const name_rol= req.body.name_rol;

    

    conexion.query('UPDATE users_roles SET ? WHERE id_UserRol= ?', [{user:user, name_rol:name_rol}, id_UserRol], (error, results)=>{
            
        if(error){
            console.log('error');
        }else{
            res.redirect('/usuario_rol');
        }

    });
}  



