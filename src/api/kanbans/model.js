import mongoose from 'mongoose'

const kanbansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  projectId:
  {
    type: String,
    required: true,
    trim: true,
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

const model = mongoose.model('Kanbans', kanbansSchema)

export const schema = model.schema
export default model
