const PedidoController = require('../controller/pedido.controller.js')

module.exports=(app)=>{
    app.get('/pedidos/tecnicos/:id',PedidoController.getPedidosByTecnico)
    app.get('/pedidos/clientes/:id',PedidoController.getPedidosByCliente)
    app.get('/pedidos/',PedidoController.getPedidos)
    app.post('/pedidos/',PedidoController.createPedido)
    app.delete('/pedidos/:id',PedidoController.deletePedido)
    app.put('/pedidos/:id',PedidoController.editPedido)
}