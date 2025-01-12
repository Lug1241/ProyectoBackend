const UserController = require('../controller/user.controller')

module.exports=(app)=>{
    app.get('/users/tecnicos/',UserController.getTecnicos)
    app.get('/users/clientes/',UserController.getClientes)
    app.get('/users/:username',UserController.getUser)
    app.get('/users/byID/:id',UserController.getUserByID)
    app.post('/users/',UserController.createUser)
    app.delete('/users/:id',UserController.deleteUser)
    app.put('/users/:id',UserController.editUser)
    app.post("/login/users",UserController.loginUser);
    app.get('/users/',UserController.getUsers)
    app.get('/users/coincidencias/',UserController.getCoincidencias)
    app.get('/users/byEmail/:email',UserController.getUserByEmail)

}