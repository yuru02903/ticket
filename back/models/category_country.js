import { Schema, model } from 'mongoose'

const schema = new Schema({
},
{
  timestamps: true,
  versionKey: false
})

export default model('category_country', schema)
