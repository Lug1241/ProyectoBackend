const FacturaController = require('../controller/factura.controller')
const Protect= require('../Middlewares/Users.middleware')
module.exports=(app)=>{
    app.get('/facturas/',Protect.OnlyAdmin,FacturaController.getFacturas)
    app.get('/facturas/:id',Protect.todos,FacturaController.getFacturasBycliente)
    app.post('/facturas/',Protect.OnlyAdmin,FacturaController.createFactura)
    app.delete('/facturas/:id',Protect.OnlyAdmin,FacturaController.deleteFactura)
    app.put('/facturas/:id',Protect.OnlyAdmin,FacturaController.updateFactura)
}