const conexion= require('../database/db');

exports.carrito= ()=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO carrito SET ?', (err, res)=> (err ? reject(err) : resolve(res)));
        });
    }  
}