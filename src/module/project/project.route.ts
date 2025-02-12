import express from 'express';
import { projectController } from './project.contaoller';

const ProjectRoute = express.Router();

// Define routes for project CRUD operations
ProjectRoute.get('/', projectController.getAllProjects);
ProjectRoute.get('/:id', projectController.getProjectById);
ProjectRoute.post('/create', projectController.createProject);
ProjectRoute.put('/update/:id', projectController.updateProject);
ProjectRoute.delete('/delete/:id', projectController.deleteProject);

export default ProjectRoute;