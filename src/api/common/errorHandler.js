const _ = require('lodash')

module.exports = (req, res, next)=>{
    const bundle = res.locals.bundle 

    if(bundle.errors){ //lista de erros padrão do noderestful
        const errors = parseErrors(bundle.errors) //extrai as strings
        res.status(500).json({errors}) //retorna o objeto
    }else{
        next()
    }
}

const parseErrors = (nodeRestfulErros)=>{
    const errors = []
    _.forIn(nodeRestfulErros, error => errors.push(error.message))
    return errors
}