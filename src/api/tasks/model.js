import mongoose from 'mongoose'

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  processorId:{
    type:String,
    trim: true,
  },
  projectId:{
    type: String,
    required: true,
    trim: true,
  },
  kanbanId:
  {
    type: String,
    required: true,
    trim: true,
  },
  type:
  {
    type: String,
    trim: true,
  }
}, {
  toJSON: {
    transform: (obj, ret) => {
      delete ret.__v
    }
  }
})
const model = mongoose.model('Tasks', tasksSchema)

export const schema = model.schema
export default model
