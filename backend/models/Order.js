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
            const {items, customer, payment} = body
            const products = await Product.find(items)

            // Array for the full items
            let orderProducts = []

            items.forEach( id => {
                // Find the product
                const product = products.find(product => product._id == id)
                
                // increment product amount by one
                if(product.amount != undefined)  product.amount++
                // Add product tag
                else product.amount = 1

                // Create product item
                let item = product;

                // If product does not exist in order
                if(!orderProducts.find(i => i._id == item._id))
                    // Add the full item to the array
                    orderProducts.push(item);
            })

            const order = await orders.insert({
                // Add the item objects to the order
                // This will make shiure that the order will not be affected if any products get updated
                orderProducts,
                timeStamp: Date.now(),
                status: 'inProcess',
                orderValue: products.reduce( (acc,product) => acc+product.price*product.amount, 0)
            })       

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