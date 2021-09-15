import express, {Request, Response, NextFunction} from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models'
import { GeneratedPassword, GenerateSalt } from '../utility';

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVandorInput>req.body;

    // If vandor exists, dont create
    const existingVandor = await Vandor.findOne({email: email})
    if(existingVandor != null){
        return res.json({"message": "A vandor already exists in the database"})
    }

    //Decrypting the password
    const salt = await GenerateSalt()
    const userPassword = await GeneratedPassword(password, salt)


    const createdVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        ownerName: ownerName,
        salt: salt,
        phone: phone,
        rating: 0,
        serviceAvialable: false,
        coverImages: [],
    })
    
    return res.json(createdVandor)

}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const GetVandorsByID = async (req: Request, res: Response, next: NextFunction) => {
    
}



