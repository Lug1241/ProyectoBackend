const ServicioController= require('../controller/servicio.controller')
const Protect= require('../Middlewares/Users.middleware')
module.exports =(app)=>{
    app.get('/servicios/facturas/:id',Protect.AdminAndTecnico,ServicioController.getServiciosByFactura)
    app.post('/servicios/',Protect.AdminAndTecnico,ServicioController.createServicio)
    //app.put('/servicios/:id',ServicioController.editServicio)
    //app.delete('/servicios/:id',ServicioController.deleteServicio)
}