import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { projectSchema, updateProjectSchema } from "./project.validation";
import { projectService } from "./project.service";
import { ProjectModel } from "./peoject.model";

// Create a new project
const createProject = catchAsync(async (req: Request, res: Response) => {
  const validatedData = projectSchema.parse(req.body); // Validate the data using Zod schema
  const newProject = await projectService.createProject(validatedData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Project created successfully!",
    data: newProject,
  });
});

// Get all projects
const getAllProjects = catchAsync(async (_req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: projects,
  });
});

// Get a single project by ID
const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid project ID");
  }

  const project = await projectService.getSingleProject(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project retrieved successfully",
    data: project,
  });
});

// Update a project
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid project ID");
  }

  const validatedData = updateProjectSchema.parse(req.body); // Validate the update data
  const updatedProject = await projectService.updateProject(id, validatedData);

  if (!updatedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});

// Delete a project
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid project ID");
  }

  const deletedProject = await ProjectModel.findByIdAndDelete(id);

  if (!deletedProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project deleted successfully",
    data: deletedProject,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
