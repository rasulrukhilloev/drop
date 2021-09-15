import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models'
import { GeneratedPassword, GenerateSalt } from '../utility';

export const FindVandor = async(id: string | undefined, email?: string) => {
    if(email) {
        const vandor = await Vandor.findOne({email: email})
        return vandor
    }else{
        return await Vandor.findById(id)
    }
}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVandorInput>req.body;

    // If vandor exists, dont create
    const existingVandor = await FindVandor('', email)
    if(existingVandor !== null){
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
    const vandors = await Vandor.find()

    if(vandors !== null){
        return res.json(vandors)
    }

    return res.json({"message": "vandors data is not available"})
}

export const GetVandorsByID = async (req: Request, res: Response, next: NextFunction) => {
    const vandorID = req.params.id;

    const vandor = await FindVandor(vandorID);

    if(vandor !== null) {
        return res.json(vandor)
    }

    return res.json({"message": "vandor with that ID is not available"})
}



