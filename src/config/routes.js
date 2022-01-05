const express = require('express')

module.exports = function(server){
    //URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router) //sempre que chegar uma requisição com /api chama o router

    //Rotas de ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles') //registra os métodos    
}