import { Document, PassportLocalDocument } from 'mongoose';

export interface IUser extends PassportLocalDocument {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    //readonly username: string;
    readonly password: string;
    readonly username: string;
    readonly added_on: Date;
}

