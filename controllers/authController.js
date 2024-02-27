const conexion= require('../database/db');
const { use } = require('../router');
const jwt= require('jsonwebtoken');
const bcryptjs= require('bcryptjs');
const {promisify}= require('util');


exports.usuario=(req, res, next)=>{
    //req.user= 'franco';
    const verdadero=false;
    
    if(verdadero){
        next();
    }else{
        res.render('login');
        return;
    }
    
}

exports.rol=(req, res, next)=>{

    const {user, pass}= req.params;
    const rol= req.body.rol;
    //user= req.user;
    const verdadero=true;
    
    
    

        if(verdadero){

            next();
    
        }else{
    
                
            conexion.query('SELECT * FROM producto', (error, results)=>{
    
                if(error){
    
                    throw error;
    
                }else{
                        
                    res.render('admin', {results, alert:false});
                }
    
            });
            
            return;
        }

    
    
}



//Autenticarse
exports.isAuthenticated= async (req, res, next)=>{

    if(req.cookies.jwt){

        try{

            const decodificada= await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);

        
            conexion.query('SELECT * FROM users WHERE id= ?', [decodificada.id], (error, results)=>{

                if(!results){return next()}
                console.log(req.name= results[0]);
                return next(); 
            });
                
            

        }catch(error){

            console.log(error);
            return next();

        }

    }else{
        res.redirect('/login');
    }
}




//Autorizacion roles
exports.isAuthorizated = (rol)=>async(req, res, next)=>{

    let ArrayRoles=[];

    if (req.cookies.jwt){ //pregunto si la cookie de nombre jwt es verdadero 
      // let aut=false
        try {
            
            const decodificada= await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO); //verficamos el token
            
            
            if(decodificada){

                
                decodificada.rol.forEach(roles => {
                    ArrayRoles.push(roles.nombre_rol);
                });
                

                if(rol.some(r=> ArrayRoles.includes(r))){ //si el rol que tiene esta permitido pasa

                    next();

                }else{

                    res.render('inicio', {user: req.user, 
                        alert: true,
                        alertTitle: 'Advertencia',
                        AlertMessage: 'Función No Autorizada',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 4000,
                        ruta: '/' 
                    });

                }
                
            }else{
                
                res.render('inicio', {user: req.user,
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Función No Autorizada',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: '/' 
                });
                
            }
            
   
        } catch (error) {
            
            console.log(error)
           
        }
       
    }else{
        
        res.redirect('/login') //si no hay token se envia de nuevo al login
    }
}

/* exports.logout= (req, res)=>{
    res.clearCookie('jwt');
    return res.redirect('/inicio');
} */