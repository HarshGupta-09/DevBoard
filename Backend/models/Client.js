import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    phone: {
        type: String,
    },

    company: {
        type: String,
    },

    address: {
        type: String,
    },

    notes: {
        type: String,
    }

}, {
    timestamps: true
});


clientSchema.index({ user: 1, email: 1 }, { unique: true });

const clientModel = mongoose.model("Client", clientSchema);

export default clientModel;