import { Request, Response, NextFunction } from 'express';

import { FindVandor } from '.';
import { VandorLoginInputs } from '../dto';
import { ValidatePassowrd } from '../utility';

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const {email, password} = <VandorLoginInputs>req.body;

    const existingVandor = await FindVandor('', email);

    if(existingVandor !== null){

        const validation = await ValidatePassowrd(password, existingVandor.password, existingVandor.salt);

        if(validation){
            return res.json(existingVandor)
        }else{
            return res.json({"message": "Password is not valid"})
        }

        //validation and give access
    }

    return res.json({"message": "Login credentials are not valid"})

}

export const GetVandorProfile = async(req: Request, res: Response, next: NextFunction) => {

}

export const UpdateVandorProfile = async(req: Request, res: Response, next: NextFunction) => {

}

export const UpdateVandorSevice = async(req: Request, res: Response, next: NextFunction) => {

}