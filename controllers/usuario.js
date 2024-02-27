const conexion= require('../database/db');
const servicioUsuario= require('../service/usuario');

exports.usuario= (req, res)=>{
    conexion.query('INSERT INTO users SET ?', (error, results)=>{
      
        res.render('user', {user: req.user, results});
    });

}
