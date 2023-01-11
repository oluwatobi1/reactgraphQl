const BASE_URL = "https://api-clag.onrender.com/"
class API {
    static async get(url) {
        await fetch(BASE_URL+url, {
            method: 'GET',
        })
    }
    static async post(url, payload) {
        await fetch(BASE_URL+url, {
            method: 'POST',
            body: payload
        })
    }
    
}
export default API;