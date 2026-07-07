import mongoose, { Schema } from "mongoose";
import { Project } from "./project.intarface";



// Define the Mongoose Schema for Project
const ProjectSchema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveLink: { type: String, required: true },
  order: { type: Number, default: 0 },
  frontendSource: { type: String },
  backendSource: { type: String },
}, { timestamps: true });

// Create the Project model based on the schema
export const ProjectModel = mongoose.model<Project>('ProjectModel', ProjectSchema);
