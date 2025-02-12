
import { IUser } from './user.intarface';
import { User } from './user.model';

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}


const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}



export const userService = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}