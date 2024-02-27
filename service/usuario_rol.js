const conexion= require('../database/db');

exports.usuario_rol= ()=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO users_roles SET ?', (err, res)=> (err ? reject(err) : resolve(res)))
        });
    }  
}