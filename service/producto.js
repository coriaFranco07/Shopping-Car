const conexion= require('../database/db');

exports.producto= ()=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO producto SET ?', (err, res)=> (err ? reject(err) : resolve(res)))
        });
    }  
}