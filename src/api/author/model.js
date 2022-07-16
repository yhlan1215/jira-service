import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  birth: {
    type: Date,
    required: true
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

authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  justOne: false
})

const model = mongoose.model('Author', authorSchema)

export const schema = model.schema
export default model
