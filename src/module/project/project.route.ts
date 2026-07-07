import express from 'express';
import { projectController } from './project.contaoller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const ProjectRoute = express.Router();

// Define routes for project CRUD operations
ProjectRoute.get('/', projectController.getAllProjects);
ProjectRoute.get('/:id', projectController.getProjectById);
ProjectRoute.post('/create', auth(USER_ROLE.admin), projectController.createProject);
ProjectRoute.put('/update/:id', auth(USER_ROLE.admin), projectController.updateProject);
ProjectRoute.delete('/delete/:id', auth(USER_ROLE.admin), projectController.deleteProject);

export default ProjectRoute;