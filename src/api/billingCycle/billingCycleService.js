//Serviços rest
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', errorHandler).after('put', errorHandler) //chama os middlewares

//Definindo comportamento da chamada 'get'
BillingCycle.route('get', (req, res, next) => {
    //find sem parametros busca todos os registros na coleção BillingCycle
    BillingCycle.find({}, (err, docs) => { 
        if(!err) {
            //se não produzir um erro, retorna o documento
            res.json(docs) 
        } else {
            res.status(500).json({errors: [error]})
        }
    })
})

//Serviço que retorna a quantidade de registros
BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value)=>{
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})//qtde de registros
        }
    })
})

//Sumário de pagamentos
BillingCycle.route('summary', (req, res, next)=>{
    BillingCycle.aggregate([{ 
        //passos para agregar o valor do sumário

        //o que será extraído do objeto billingCycle
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, {
        //agrupa os valores baseado em algum critério
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        //atributos que serão projetados (0=não, 1=sim)
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result)=> {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle