const ServicioController= require('../controller/servicio.controller')

module.exports =(app)=>{
    app.get('/servicios/facturas/:id',ServicioController.getServiciosByFactura)
    app.post('/servicios/',ServicioController.createServicio)
    app.put('/servicios/:id',ServicioController.editServicio)
    app.delete('/servicios/:id',ServicioController.deleteServicio)
}