const NeDB = require('nedb-promise')
const orders = new NeDB({filename:'database/orders.db', autoload: true})
const Product = require('./Product')
const User = require('./User')

function validate(body){
    let {items, customer, payment} = body
    if(items || customer || payment){ return true }
    return false
}

module.exports = {
    async create(body, user){
        if(validate(body)){
            // Pull data from body
            const {items, customer, payment} = body

            // Load products outside of foreach
            let loadedProducts = await Product.find(items.map(i => i.id));

            // Create array for products
            let orderProducts = []
            // Loop through all items
            items.forEach(i => {
                // Get product
                let prod = loadedProducts.find(p => p._id == i.id)
                // Set amount
                prod.amount = i.amount;
                // Push item
                orderProducts.push(prod);
            })      

            // Create order
            const order = await orders.insert({
                // Save full items on the receipt, this will make shure that the data will not change if
                // products in the orde gets removed or changed
                orderProducts,  
                // Set timestamp on order
                timeStamp: Date.now(),
                // Set default status on the order
                status: 'inProcess',
                // Save the total price for the order
                orderValue: orderProducts.reduce( (acc,product) => acc+product.price*product.amount, 0),
                // Save customer and shipping address for each order
                // on the receipt, this makes shure that customers that are not logged in will be logged
                // and that the data on the receipt does not change if logged in user
                // changes profile settings.
                customer
            })       

            // The customer name is not needed when updating the billing address
            delete customer.name

            // Update users payment details
            await User.updatePaymentDetails(payment, user);
            // Update the users billing address
            await User.updateBillingDetails(customer, user)

            // Add order to user's order history
            await User.addOrderToUser(order, user)
            
            return {error:false}
        }
        else return {error:true}

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