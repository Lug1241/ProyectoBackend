const FacturaController = require('../controller/factura.controller')

module.exports=(app)=>{
    app.get('/facturas/',FacturaController.getFacturas)
    app.get('/facturas/:id',FacturaController.getFacturasBycliente)
    app.post('/facturas/',FacturaController.createFactura)
    app.delete('/facturas/:id',FacturaController.deleteFactura)
}