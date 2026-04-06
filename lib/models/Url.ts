import mongoose, { Schema, Document } from "mongoose";

interface IUrl extends Document {
  shortCode: string;
  originalUrl: string;
  title?: string;
  description?: string;
  qrCode?: string;
  clicks: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    shortCode: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    originalUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: "Invalid URL format",
      },
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    qrCode: {
      type: String,
      default: "",
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      index: true,
      sparse: true,
    },
    expiresAt: {
      type: Date,
      index: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

// TTL index for automatic deletion of expired URLs
urlSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    sparse: true,
  }
);

export const Url = mongoose.models.Url || mongoose.model<IUrl>("Url", urlSchema);
