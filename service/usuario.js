const conexion= require('../database/db');

exports.usuario= ()=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO users SET ?', (err, res)=> (err ? reject(err) : resolve(res)))
        });
    }  
}