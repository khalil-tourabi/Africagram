import bcrypt from "bcryptjs";

const hashPassword = async(password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw new Error("Error hashing password: " + err.message);
  }
}

export default hashPassword;