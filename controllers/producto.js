const conexion= require('../database/db');
const servicioProducto= require('../service/producto');

exports.producto= (req, res)=>{
    conexion.query('INSERT INTO producto SET ?', (error, results)=>{
      
        res.render('user', {user: req.user, results});
    });

}
