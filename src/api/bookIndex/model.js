import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'

const bookIndexSchema = new Schema({
  bookName: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  theNumberOfBooks: {
    type: Number
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
      delete ret.__v
    }
  }
})

bookIndexSchema.plugin(idValidator)
const model = mongoose.model('BookIndex', bookIndexSchema)

export const schema = model.schema
export default model
