const fetch = require('node-fetch')

class ApiUtil {
    config = {
        HOSTNAME: process.env.NODE_ENV ? 'http://localhost:4000' : ''
    }

    commonCallback = ({endpoint, payload, method}) => (
        fetch(this.config.HOSTNAME + endpoint, {
            body: JSON.stringify(payload),
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
    )
    
    post = (endpoint, payload) => {
        return this.commonCallback({
            endpoint,
            payload,
            method: 'POST'
        })
    }
    
    put = (endpoint, payload) => {
        return this.commonCallback({
            endpoint,
            payload,
            method: 'PUT'
        })
    }

    get = (endpoint) => {
        return fetch(this.config.HOSTNAME + endpoint)
            .then(response => response.json())
    }
}
const apiUtil = new ApiUtil()
export default apiUtil