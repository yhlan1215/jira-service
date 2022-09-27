import mongoose from 'mongoose'
import idValidator from 'mongoose-id-validator'

const projectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  personId:{
    type:String,
    required: true,
    trim: true,
  },
  organization:{
    type: String,
    required: true,
    trim: true,
  },
  pin:
  {
    type: Boolean,
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

projectsSchema.plugin(idValidator)
const model = mongoose.model('Projects', projectsSchema)

export const schema = model.schema
export default model
