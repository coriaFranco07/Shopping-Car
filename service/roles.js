const conexion= require('../database/db');

exports.roles= ()=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO roles SET ?', (err, res)=> (err ? reject(err) : resolve(res)))
        });
    }  
}

exports.rolesNoUser= (id_user)=>{
    
    const query = () => {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM roles LEFT JOIN users_roles ON users_roles.id_UserRol = ?', (err, res)=> (err ? reject(err) : resolve(res)))
        });
    }  
}


