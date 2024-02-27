const conexion= require('../database/db');
const servicioRoles= require('../service/roles');

exports.roles= (req, res)=>{

    conexion.query('INSERT INTO roles SET ?', (error, results)=>{
      
        res.render('rol', 'roles', {results:results});
    });

}

exports.rolesNoUser= (id_user, req, res)=>{
    
    conexion.query('SELECT * FROM roles LEFT JOIN users_roles ON users_roles.id_user = ?', (error, results)=> {

        //res.render('rol', 'roles', {results});
        console.log(results);
        

    });

     
}