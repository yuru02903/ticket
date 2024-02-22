import { Schema, model } from 'mongoose'

const schema = new Schema({
  group: {
    type: String,
    required: [true, '缺少表演者性質']
  }
},
{
  timestamps: true,
  versionKey: false
})

export default model('categoryGroup', schema)
