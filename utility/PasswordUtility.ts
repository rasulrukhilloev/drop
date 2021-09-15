import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratedPassword = async(password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassowrd = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratedPassword(enteredPassword, salt) === savedPassword;
}