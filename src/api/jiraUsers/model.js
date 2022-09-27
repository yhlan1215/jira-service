import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  }
}, {
  toJSON: {
    transform: (obj, ret) => {
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    }
  }
})

const model = mongoose.model('JiraUsers', userSchema)

export const schema = model.schema
export default model
