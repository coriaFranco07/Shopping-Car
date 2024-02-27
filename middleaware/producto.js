const conexion= require('../database/db');
const { use } = require('../router');


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

    const user= req.user;
    const pass= req.pass;
    //user= req.user;
    const verdadero=true;
    

    if(verdadero==true){

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

exports.isAuthenticated= async (req, res, next)=>{

    if(req.cookiesOptions.jwt){

        try{

            const decodificada= await promisify(jwt.verify)(req.cookiesOptions.jwt, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM users WHERE id= ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user= results[0];
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

exports.logout= (req, res)=>{
    res.clearCookie('jwt');
    return res.redirect('/inicio');
}