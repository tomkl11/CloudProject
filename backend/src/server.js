const app = require('./app');
const sequelize = require('./config/db');
const User = require('./models/User');
const School = require('./models/School');
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    // Seed data if empty
    const userCount = await User.count();
    const schoolCount = await School.count();
    if (userCount === 0 || schoolCount === 0) {
      await seedData(); 
    }

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error);
  }
}

async function seedData() {
    console.log("🌱 Seeding initial data...");
    await User.create({
      name: 'Admin',
      email: 'admin@securesup.fr',
      password: 'admin_password',
      role: 'ADMIN'
    });

    await User.create({
      name: 'student',
      email: 'student@securesup.fr',
      password: 'student_password',
      role: 'USER'
    });

    await School.bulkCreate([
      { name: 'Efrei', status: 'Private', maxPlace: 2000000 },
      { name: 'Sorbonne', status: 'Public', maxPlace: 1000000 },
      { name: 'Epita', status: 'Public', maxPlace: 2000000 },
      { name: 'Polytechnique', status: 'Public', maxPlace: 500000 },
      { name: 'Epitech', status: 'Private', maxPlace: 2000000 },
    ]);

    console.log("Seed completed.");
}

startServer();