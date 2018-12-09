const fetch = require('node-fetch')

class ApiUtil {
    config = {
        HOSTNAME: process.env.NODE_ENV ? 'http://localhost:4000' : ''
    }
    
    post = (endpoint, payload) => {
        return fetch(this.config.HOSTNAME + endpoint, {
            body: JSON.stringify(payload),
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
    }

    get = (endpoint) => {
        return fetch(this.config.HOSTNAME + endpoint)
            .then(response => response.json())
    }
}
const apiUtil = new ApiUtil()
export default apiUtil