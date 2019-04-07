import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const CustomUserSchema = new mongoose.Schema({
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },    
    email: { type: String, required: false, trim: true },
    password: { type: String, required: false, trim: true },
});
CustomUserSchema.plugin(passportLocalMongoose);