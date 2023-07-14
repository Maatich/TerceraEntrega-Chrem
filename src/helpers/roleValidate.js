//Verifico si el rol del usuario es "usuario"
export const userAccess = (req,res,next)=>{
  if(req.session.user && req.session.user.role === "Usuario"){
     next();
  } else {
      res.status(400).json({status:"error", message:"No tienes permiso para acceder a esta ruta."});
  }
}
//Verifico si el rol del usuario es "administrador"
export const adminAccess = (req,res,next)=>{
  if(req.session.user && req.session.user.role === "Administrador"){
     next();
  } else {
      res.status(400).json({status:"error", message:"No tienes permiso para acceder a esta ruta."});
  }
}