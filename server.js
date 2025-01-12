const express = require('express');
const cors=require('cors')
const app = express();
app.use( express.json() );
app.use(express.urlencoded({ extended: true }));
const port = 8000;


require('./config/mongoose.config');
app.use(cors());


const allUser = require('./routes/user.routes')
const allPedido= require('./routes/pedido.routes')
const allServicio= require('./routes/servicio.routes')
const allFactura= require('./routes/factura.routes')

allUser(app)
allPedido(app)
allServicio(app)
allFactura(app)



app.listen(port, () => {
console.log("Server listening at port", port);
})
