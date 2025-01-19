import mongoose, { Schema, Document } from "mongoose";

interface ISecret extends Document {

  content: string;
  ttl: Date;
  maxViews: number;
  views: number;
}

const secretSchema = new Schema<ISecret>({

  content: { type: String, required: true },
  ttl: { type: Date, required: true },
  maxViews: { type: Number, required: true },
  views: { type: Number, required: true, default: 0 },

});

export const Secret = mongoose.model<ISecret>("shoprenter-secret", secretSchema);
