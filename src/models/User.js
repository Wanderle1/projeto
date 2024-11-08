import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contas: { type: Number, default: 0 }
});

export default model('User', userSchema);


