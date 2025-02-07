const PedidoController = require('../controller/pedido.controller.js')
const Protect= require('../Middlewares/Users.middleware')
module.exports=(app)=>{
    app.get('/pedidos/tecnicos/:id',Protect.AdminAndTecnico,PedidoController.getPedidosByTecnico)
    app.get('/pedidos/clientes/:id',Protect.todos,PedidoController.getPedidosByCliente)
    app.get('/pedidos/',Protect.OnlyAdmin,PedidoController.getPedidos)
    app.post('/pedidos/',Protect.todos,PedidoController.createPedido)
    app.delete('/pedidos/:id',Protect.OnlyAdmin,PedidoController.deletePedido)
    app.put('/pedidos/:id',Protect.AdminAndTecnico,PedidoController.editPedido)
    app.put('/pedidos/cliente/:id_cliente/:id_pedido',Protect.AdminAndClient,PedidoController.editPedidoByClient)
    app.put('/pedidos/tecnico/:id_tecnico/:id_pedido',Protect.AdminAndClient,PedidoController.editPedidoByTecnico)
    app.delete('/pedidos/cliente/:id_cliente/:id_pedido',Protect.AdminAndClient,PedidoController.deletePedidoByClient)
    app.delete('/pedidos/tecnico/:id_tecnico/:id_pedido',Protect.AdminAndTecnico,PedidoController.deletePedidoByTecnico)
}