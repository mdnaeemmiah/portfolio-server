import { Router } from 'express';
import userRouter from '../module/user/user.route';
import authRouter from '../module/auth/auth.route';
import blogRoute from '../module/blog/blog.route';
import ProjectRoute from '../module/project/project.route';
import messageRoute from '../module/message/message.route';

const router = Router();

const moduleRoutes = [
    {
      path: '/auth',
      route: authRouter,
    },
    {
      path: '/users',
      route: userRouter,
    },
    {
      path: '/blog',
      route: blogRoute,
    },
    {
      path: '/project',
      route: ProjectRoute,
    },
    {
      path: '/message',
      route: messageRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));

export default router;