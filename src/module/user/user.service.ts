
import { IUser } from './user.intarface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: Partial<IUser>) => {
  const updateData = { ...data };

  // If trying to update password, must verify current password
  if ('newPassword' in data && data.newPassword) {
    const currentPasswordPlain = (data as any).currentPassword;
    if (!currentPasswordPlain) {
      throw new Error('Current password is required to change password');
    }

    // Fetch user with password field
    const user = await User.findById(id).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPasswordPlain, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Remove currentPassword from updateData and set newPassword as password
    delete (updateData as any).currentPassword;
    updateData.password = data.newPassword;
    delete (updateData as any).newPassword;
    updateData.needsPasswordChange = false;
    updateData.passwordChangedAt = new Date();
  } else if (updateData.password) {
    // Direct password update (for admin or initial setup)
    updateData.password = await bcrypt.hash(
      updateData.password,
      Number(config.bcrypt_salt_rounds),
    );
    updateData.needsPasswordChange = false;
    updateData.passwordChangedAt = new Date();
  }

  const result = await User.findByIdAndUpdate(id, updateData, {
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