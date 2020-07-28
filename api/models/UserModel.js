import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
// import { strict } from 'assert'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        default: ''

    },
    position: {
        type: String,
        default: ''
    },
    salary: {
        type: Number,
        default: null
    },
}, {
    versionKey: false,
    collection: 'users'
})

UserSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 12)
    }
    next()
})

export default mongoose.model('user', UserSchema)