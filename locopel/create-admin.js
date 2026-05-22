const bcrypt = require("bcryptjs");
const { User } = require('./src/db'); 
const { sequelize } = require('./src/db');

async function createAdmin() {
  await sequelize.sync();
  
  const adminTel = "123";
  const adminPassword = "admin123";
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const admin = await User.findOne({ where: { phone: adminTel } });
  
  if (!admin) {
    await User.create({
      phone: adminTel,
      password: hashedPassword,
      name: "Администратор",
      role: "admin",
      email: "admin@locopelo"
    });
    console.log("✅ Админ создан: 123 / admin123");
  } else {
    console.log("✅ Админ уже существует");
  }
}

createAdmin();