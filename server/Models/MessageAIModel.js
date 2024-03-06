const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AIUsers",
            required: true,
        },
        isAIgenerated: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("BotMessages", messageSchema);