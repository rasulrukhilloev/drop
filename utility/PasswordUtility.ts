import bcrypt from "bcryptjs";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratedPassword = async(password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}