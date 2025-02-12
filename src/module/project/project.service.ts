 // Importing the Project interface

import { ProjectModel } from "./peoject.model";
import { Project } from "./project.intarface";

// Fetch all projects
const getAllProjects = async () => {
  const result = await ProjectModel.find();
  return result;
};

// Fetch a single project by ID
const getSingleProject = async (id: string) => {
  const result = await ProjectModel.findById(id);
  return result;
};

// Create a new project
const createProject = async (data: Project) => {
  const result = await ProjectModel.create(data);
  return result;
};

// Update a project
const updateProject = async (id: string, data: Partial<Project>) => {
  const result = await ProjectModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,  // Ensures validation runs for updates
  });
  return result;
};

// Delete a project
const deleteProject = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const projectService = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
