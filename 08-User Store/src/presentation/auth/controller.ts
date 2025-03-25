import { Request, Response } from "express";
import { CustomError, RegisterDTO } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../../domain/dtos/auth/login-user.dto";

export class AuthController{
    constructor(
        public readonly authService: AuthService
    ){}

    private handleError = (error: unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(`${error}`)
        return CustomError.internalserver
    }

    register=(req:Request, res: Response)=>{
        const [error, register]= RegisterDTO.create(req.body)
        if ( error ) return res.status(400).json({error})
            this.authService.registerUser(register!)
                .then( (user)=>res.json(user))
                .catch((error)=> this.handleError(error,res))
    }

    login=(req:Request, res: Response)=>{
        const [error, login]= LoginDTO.check(req.body)
        if ( error ) return res.status(400).json({error})
            this.authService.loginUser(login!)
                .then( (user)=>res.json(user))
                .catch((error)=> this.handleError(error,res))
    }

    validate=(req:Request, res: Response)=>{
        const {token}=req.params
        res.json(token)
        this.authService.validateEmail(token).then(()=>res.json('Email validated')).catch(error=>this.handleError(error, res))
    }
}