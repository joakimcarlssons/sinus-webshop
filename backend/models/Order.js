const NeDB = require('nedb-promise')
const orders = new NeDB({filename:'database/orders.db', autoload: true})
const Product = require('./Product')
const User = require('./User')

function validate(body){
    let {items} = body
    if(items){ return true }
    return false
}

module.exports = {
    async create(body, user){
        if(validate(body)){
            // Pull data from body
            const {items, customer, payment} = body

            console.log(customer);
            console.log(payment);
            
            // Create order
            const order = await orders.insert({
                // Add the item objects to the order
                // This will make shiure that the order will not be affected if any products get updated
                orderProducts : items,
                timeStamp: Date.now(),
                status: 'inProcess',
                orderValue: items.reduce( (acc,product) => acc+product.price*product.amount, 0)
            })       

            // Add order to user's order history
            await User.addOrderToUser(order, user)
            
            return {error:false}
        }else{
            return {error:true}
        }

    },

    async all(){
        const ords = await orders.find({})
        return ords.sort( (a,b) => a.timeStamp - b.timeStamp)
    },

    async findByCustomer(userID){
        let user = await User.findOne(userID)
        const ords = await orders.find({_id:{$in:user.orderHistory}})
        return ords
    }
}