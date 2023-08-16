const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const valuesSchema = require('./Values.js');

const formSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        vacancy: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        questions: [
            {
                order: {
                    type: String
                },
                values: [valuesSchema.schema]
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Form", formSchema);
