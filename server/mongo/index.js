import {model, Schema} from 'mongoose'


const apiSchema = new Schema({
    panelName: String,
    panelId: Number
})

const API = model('API', apiSchema)

export default API
