const conexion= require('../database/db');
const servicioCarrito= require('../service/carrito');

exports.carrito= (req, res)=>{

    const id_producto= req.params.id_producto;
    const precio= req.params.precio;
    const cant= req.params.cant;


    conexion.query('INSERT INTO carrito SET ?', {id_producto:id_producto, precio:precio, cant:cant}, (error, results)=>{
      
        if(error){

            throw error;

        }else{

            res.redirect('/agregar', {results:results});

        }
    });

}