import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },

    amount: {
        type: Number,
        default: null,  
    },

    order: {
        type: Number,
    },

    dueDate: {
        type: Date,
    }

}, {
    timestamps: true
});
milestoneSchema.index({ project: 1, order: 1 }, { unique: true });

const milestoneModel = mongoose.model("Milestone", milestoneSchema);

export default milestoneModel;