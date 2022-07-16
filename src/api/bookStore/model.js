import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

const bookStoreSchema = new Schema({
  storeName: {
    type: String,
    required: true
  },
  bookIndex: [{
    type: Schema.Types.ObjectId,
    ref: 'BookIndex'
  }]
}, {
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
      delete ret.__v
    }
  }
})

bookStoreSchema.plugin(idValidator)
const model = mongoose.model('BookStore', bookStoreSchema)

export const schema = model.schema
export default model
