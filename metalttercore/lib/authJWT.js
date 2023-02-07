// Cargar librería
const jwt = require('jwt')

// Exportar middleware
module.exports = (req, res, next) => {

    // buscar en la base de datos el usuario y comprobar sus credenciales
    if (!usuario || usuario.name !== 'admin' || usuario.pass !== '1234') {
        res.set('www-Authenticate', 'Basic realm=Authication required')
        res.sendStatus(401)
        return
    }

    const token = jwt.sign({ userId: 'b86ggg6687'}, 'Dgh5Hmnbkib868g.7bg8g767f5f7')

    next()

}