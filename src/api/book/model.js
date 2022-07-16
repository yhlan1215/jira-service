import mongoose from 'mongoose'
import idValidator from 'mongoose-id-validator'

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    index: true,
    required: true
  },
  price: {
    type: Number,
    index: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['fiction', 'literature', 'art', 'animation humor', 'entertainment fashion', 'tourism', 'map geography'],
    index: true,
    trim: true,
    required: true
  },
  isOld: {
    type: Boolean,
    index: true,
    default: false
  },
  language: {
    type: String,
    index: true,
    trim: true
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

bookSchema.virtual('bookIndexs', {
  ref: 'BookIndex',
  localField: '_id',
  foreignField: 'bookName',
  justOne: false
})

bookSchema.plugin(idValidator)
const model = mongoose.model('Book', bookSchema)

export const schema = model.schema
export default model
