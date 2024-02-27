const conexion= require('../database/db');
const servicioUsuario_rol= require('../service/usuario_rol');

exports.usuario_rol= (req, res)=>{
    conexion.query('INSERT INTO users_roles SET ?', (error, results)=>{
      
        res.render('userRol', {user: req.user, results:results});
    });

}