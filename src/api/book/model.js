import mongoose, { Schema } from 'mongoose'

const bookSchema = new Schema({
  name: {
    type: String
  },
  author: {
    type: String
  },
  price: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bookSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      author: this.author,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Book', bookSchema)

export const schema = model.schema
export default model
