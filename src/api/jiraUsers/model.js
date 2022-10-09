import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  username:{
    type: String,
    trim: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100
  },
  picture:{
    type: String,
    trim: true
  }
}, {
  toJSON: {
    transform: (obj, ret) => {
      delete ret.password
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    }
  }
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 9).then(hash => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  authenticate(password) {
    return bcrypt.compare(password, this.password).then(valid => valid ? this : false)
  }

}

const model = mongoose.model('JiraUsers', userSchema)

export const schema = model.schema
export default model
