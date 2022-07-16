import mongoose from 'mongoose'
import idValidator from 'mongoose-id-validator'

const bookStoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true
  },
  bookIndex: [{
    type: mongoose.Schema.Types.ObjectId,
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
