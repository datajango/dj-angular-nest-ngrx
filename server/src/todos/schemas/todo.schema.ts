import * as mongoose from 'mongoose';

// All fields in a mongoose schema are optional by default
// A field is only required if you add required: true to its definition.

const statusLookup: string[] = ['open', 'closed', 'in progress'];

const statusChoices: string = statusLookup.join(', ');

export const TodoSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, trim: true },
    image: { type: String },
    text: {
        type: String,
        trim: true,
        validate: {
            validator: function (v: string) {
                if (v.length < 10) {
                    return false;
                } else {
                    return true;
                }
            },
            message: 'Test should be at least 10 characters long.'
        },
        required: true
    },
    completed: { type: Boolean, default: false },
    status: {
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        //default: 'Not Done',
        validate: {
            validator: function (v: string) {
                if (statusLookup.indexOf(v) === -1 ) {
                    return false;
                } else {
                    return true;
                }
            },
            message: `Status must be one of ${statusChoices}.`
        },
    },
    added_on: { type: Date, default: Date.now },
    completed_on: { type: Date, default: null },
    cancelled_on: { type: Date, default: null },
});
