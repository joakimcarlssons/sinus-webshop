// Required imports
import axios from 'axios';

// Constant variables
const baseURL = 'http://localhost:5000/api/';

//#region Authentication functions

// Login a user
export async function login(userEmail, userPassword) {
    try{
        // Return response
        return await axios({
            method: 'post',
            url: `${baseURL}auth`,

            // Request body
            data : {
                email : userEmail,
                password : userPassword,

            }
        });

    // If the request failed
    } catch {
        // return error response
        return { error: "Bad request"};
    }
}
// Register a new user
export async function register(userEmail, userPassword, userRepeatPassword) {
    try{
        // Return response
        return await axios({
            method: 'post',
            url: `${baseURL}register`,
            // Request body
            data: {
                email:          userEmail,
                password:       userPassword,
                repeatPassword: userRepeatPassword
            }
        });
    } catch {
        // Return error response
        return { errors: ["Bad request"] };
    }
}

//#endregion

//#region Product functions

// Gets all products from the database
export async function getProducts() {
    try {
        // Return all products from the database
        return await axios.get(`${baseURL}products`);
    } 
    catch{
        // Return error message
        return {error: "Bad request" }
    }
}
// Gets a single product from the database
export async function getProductById(id) {
    try {
        // Return all products from the database
        return await axios.get(`${baseURL}products/${id}`);
    }
    catch{
        // Return error message
        return {error: "Bad request" }
    }
}

// Creates a new product and adds it to the database
export async function createProduct(product, token) {
    try{
        // Return response
        return await axios({
            method: 'post',
            url: `${baseURL}products`,
            header: {
                // Put the JWT token in the header
                Authorization: token
            },
            // product to be created
            product
        });
    }
    catch{
        // Return error message
        return {error: "Bad request" }
    }
}

// Updates a product in the database
export async function updateProduct(id, product, token) {
    try{
        // Return response
        return await axios({
            method: 'patch',
            url: `${baseURL}products/${id}`,
            header: {
                // Put the JWT token in the header
                Authorization: token
            },
            // New product data
            product
        })
    }
    catch{
        // Return error response
        return {error: "Bad request" }
    }
}

// Delets a product from the database
export async function deleteProduct(id, token){
    try{
        // Return response
        return await axios({
            method: 'delete',
            url: `${baseURL}products/${id}`,
            header: {
                // Put the JWT token in the header
                Authorization: token
            },
        });
    }
    catch{
        // Return error message
        return {error: "Bad request" }
    }
}

//#region Order functions

// Returns all orders from a specific user
export async function getOrders(token) {
    try {
        // Return all fetched orders
        return await axios({
            method: 'get',
            url: `${baseURL}orders`,
            header: {
                // Put the JWT token in the header
                Authorization: token
            }
        });
    }
    catch{
        // Return error message
        return {error: "Bad request" }
    }
}
// Create a order
export async function addOrder(order, token = null) {
    try{
        // Return response
        return await axios({
            method: 'post',
            url: `${baseURL}orders`,
            header: {
                // Put the JWT token in the header
                Authorization: token
            },
            order
        });
    } catch {
        // Return error message
        return {error: "Bad request" }
    }
}

//#endregion

//#endregion

