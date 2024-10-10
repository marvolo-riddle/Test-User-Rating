import {createAdminAccount} from "./auth.js";

const setupAdmin = async () => {
  try {
    const admin = await createAdminAccount();
    if (admin) {
      console.log('Admin account created:', admin);
    }
  } catch (error) {
    console.error('Failed to create admin:', error);
  }
};

setupAdmin();