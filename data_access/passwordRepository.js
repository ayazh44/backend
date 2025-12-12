import { db } from '../models/index.js'

export const passwordRepository = {
  resPassEmail: async (email, hashedToken) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    user.passwordResetToken = hashedToken

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    return true;
  },
  resetPassword: async (password, resetToken) => {
    const user = await db.User.findOne({where: {passwordResetToken: resetToken}});
    if (!user){
        return false;
    }
    user.password = password;
    await user.save();
    return true;
  }
}