// Required imports
import axios from 'axios';

// Constant variables
const baseURL = 'http://localhost:5000/api/';

//#region Authentication functions

//#region Parse functions
function parseSuccess(response) {
    // Parse message
    return { error: false, response: response.data }
}
function parseCatch(e) {
    // Parse message
    return { error: true, response: e.response.data.error }
}
//#endregion

// Login a user
export async function login(userEmail, userPassword) {
    // Return response
    let res = await axios({
        method: 'post',
        url: `${baseURL}auth`,
        // Request body
        data : {
            email : userEmail,
            password : userPassword,
        }
        // Catch the error code
    })
    // Handle successful request
    .then(response => parseSuccess(response))
    // If error occurred
    .catch(e => parseCatch(e));
    // return response
    return res;
}
// Register a new user
export async function register(userEmail, userPassword, userRepeatPassword, userName) {   
    // Return response
    let res =  await axios({
        method: 'post',
        url: `${baseURL}register`,
        // Request body
        data: {
            email:          userEmail,
            password:       userPassword,
            repeatPassword: userRepeatPassword,
            name: userName
        }
    })
    // Handle successful request
    .then(response => response => parseSuccess(response))
    // If error occurred - needs to be parsed differently
    .catch(e => { return { error: true, response: e.response.data.errors }});
    // Return response
    return res
}
// Returns info from the logged on user
export async function getCurrentUserInfo(token) {
    // Return response
    let res =  await axios({
        method: 'get',
        url: `${baseURL}auth`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        },
    })
    // Handle successful request
    .then(response => parseSuccess(response))
    // If error occurred - needs to be parsed differently
    .catch(e => parseCatch(e));
    // Return response
    return res
}

//#endregion

//#region Product functions

// Gets all products from the database
export async function getProducts() {
    let res = axios.get(`${baseURL}products`)
    // Handle successful response
    .then(response => parseSuccess(response))    
    .catch(e => parseCatch(e));
    // Return response
    return res
}
// Gets a single product from the database
export async function getProductById(id) {
    // Return all products from the database
    let res = await axios.get(`${baseURL}products/${id}`)
    // Handle successful response
    .then(response => parseSuccess(response))   
    // Handle error response 
    .catch(e => parseCatch(e));
    // Return response
    return res
}

// Creates a new product and adds it to the database
export async function createProduct(product, token) {
    // Return response
    let res = await axios({
        method: 'post',
        url: `${baseURL}products`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        },
        data: {
            product
        }
    })
    // Handle successful response
    .then(response => parseSuccess(response))   
    // Handle error response 
    .catch(e => parseCatch(e));
    // Return response
    return res;
}

// Updates a product in the database
export async function updateProduct(id, product, token) {
    // Return response
    let res = await axios({
        method: 'patch',
        url: `${baseURL}products/${id}`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        },
        // New product data
        data: {
            product
        }
    })
    // Handle successful response
    .then(response => parseSuccess(response))  
    // Handle error response  
    .catch(e => parseCatch(e));
    // Return response
    return res
}

// Delets a product from the database
export async function deleteProduct(id, token){
    // Return response
    let res = await axios({
        method: 'delete',
        url: `${baseURL}products/${id}`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        },
    })
    // Handle successful response
    .then(response => parseSuccess(response))    
    // Handle error response
    .catch(e => parseCatch(e));
    // Return response
    return res;
}

//#region Order functions

// Returns all orders from a specific user
export async function getOrders(token) {
    // Return all fetched orders
    let res = await axios({
        method: 'get',
        url: `${baseURL}orders`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        }
    })
    // Handle successful response
    .then(response => parseSuccess(response))    
    // Handle error response
    .catch(e => parseCatch(e));
    // Return response
    return res;
}
// Create a order
export async function addOrder(order, user, payment, token = null) {
    // Return response
    let res = await axios({
        method: 'post',
        url: `${baseURL}orders`,
        headers: {
            // Put the JWT token in the header
            Authorization: token
        },
        data: {
            items:    order,
            customer: user,
            payment:  payment
        }
    })
    // Handle successful response
    .then(response => parseSuccess(response))    
    // Handle error response
    .catch(e => parseCatch(e));
    // Return response
    return res;
}

//#endregion

//#endregion

