import mongoose, { Schema } from "mongoose";
import { Project } from "./project.intarface";



// Define the Mongoose Schema for Project
const ProjectSchema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveLink: { type: String, required: true },
}, { timestamps: true });

// Create the Project model based on the schema
export const ProjectModel = mongoose.model<Project>('ProjectModel', ProjectSchema);
