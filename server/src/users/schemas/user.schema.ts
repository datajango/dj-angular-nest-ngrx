import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    //username: { type: String, required: false, trim: true },
    password: { type: String, required: false, trim: true },
    username: { type: String, required: false, trim: true },
    added_on: { type: Date, default: Date.now }
});
UserSchema.plugin(passportLocalMongoose);