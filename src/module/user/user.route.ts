import { Router } from 'express'
import { userController } from './user.controllers'



const userRouter = Router()


userRouter.get('/:id', userController.getSingleUser)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/',userController.getUser)

export default userRouter