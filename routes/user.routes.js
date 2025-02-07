const UserController = require('../controller/user.controller')
const Protect = require('../Middlewares/Users.middleware')
module.exports=(app)=>{
    
    app.get('/users/tecnicos',Protect.AdminAndClient,UserController.getTecnicos)
    app.get('/users/clientes',Protect.AdminAndTecnico,UserController.getClientes)
    app.get('/users/byID/:id',Protect.OnlyAdmin,UserController.getUserByID)
    app.post('/users/',UserController.createUser)
    app.delete('/users/:id',Protect.OnlyAdmin,UserController.deleteUser)
    app.put('/users/:id',Protect.OnlyAdmin,UserController.editUser)
    app.post("/login/users",UserController.loginUser);
    app.get('/users/',UserController.getUsers)
    app.get('/users/coincidencias/',Protect.AdminAndTecnico,UserController.getCoincidencias)
    app.get('/users/byEmail/:email',Protect.OnlyAdmin,UserController.getUserByEmail)

}