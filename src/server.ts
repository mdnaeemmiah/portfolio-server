import { Server } from 'http';
import dns from 'dns';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { User } from './module/user/user.model';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123';

let server: Server;

async function main() {
  try {
    // Use public DNS resolvers to avoid SRV lookup failures on some networks.
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    await mongoose.connect(config.database_url as string);

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
        needsPasswordChange: false,
        status: 'in-progress',
        isBlocked: false,
      });
      console.log('Default admin user created');
    }

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
