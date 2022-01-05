//Serviços rest
const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

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

module.exports = BillingCycle