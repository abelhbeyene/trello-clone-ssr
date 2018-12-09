import {model, Schema} from 'mongoose'

const panelSchema = new Schema({
    panelId: Number,
    panelName: String,
    cards: Array
})

const cardSchema = new Schema({
    cardId: Number,
    cardName: String,
    cardDesc: Schema.Types.Mixed
})

export const panel = model('panel', panelSchema)
export const card = model('card', cardSchema)

