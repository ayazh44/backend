import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

class User extends Model {
  static associate(models) {
    User.hasMany(models.Note, { foreignKey: "userId" });
  }

  // Метод сравнения пароля
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    passwordResetToken: { type: DataTypes.STRING, allowNull: true },
    passwordResetExpires: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      // Хэширование перед созданием пользователя
      async beforeCreate(user) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);
      },

      // Хэширование перед обновлением, если пароль изменился
      async beforeUpdate(user) {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
