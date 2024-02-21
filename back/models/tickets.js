import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少票券名稱']
  },
  original_price: {
    type: Number,
    required: [true, '缺少票券原價']
  },
  price: {
    type: Number,
    required: [true, '缺少票券售價']
  },
  seat: {

  },
  seller: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少賣家']
  },
  category_country: {
    type: ObjectId,
    ref: 'category_country',
    required: [true, '請選擇表演者國籍']
  },
  category_group: {
    type: ObjectId,
    ref: 'category_group',
    required: [true, '請選擇表演者性質']
  },
  description: {
    type: String
  }
},
{
  timestamps: true,
  versionKey: false
})

export default model('tickets', schema)
