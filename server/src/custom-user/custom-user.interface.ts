import { Document, PassportLocalDocument } from 'mongoose';

export interface ICustomUser extends PassportLocalDocument {
//export interface ICustomUser extends Document {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;    
    readonly email: string;
    readonly password: string;
}

