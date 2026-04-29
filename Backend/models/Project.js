import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    billingType: {
      type: String,
      enum: ["fixed", "milestone"],
      default: "fixed",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

  budget: {
  type: Number,
  validate: {
    validator: function (value) {
      if (this.billingType === "fixed") {
        return value != null;
      }
      return true;
    },
    message: "Budget is required for fixed billing",
  },
},
    startDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.index({ user: 1, client: 1, title: 1 }, { unique: true });

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;
