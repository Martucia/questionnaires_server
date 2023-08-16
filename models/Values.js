const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const valuesSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        order: {
            type: String
        },
        name: {
            type: String
        },
        type: {
            name: {
                type: String
            },
            value: {
                type: String
            },
        }
    }
);

module.exports = mongoose.model("Value", valuesSchema);
