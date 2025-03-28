import { NextFunction, Request, Response } from "express";
import { jsonwebtokenmanager } from "../../config";
import { userModel } from "../../data/mongo";
import { UserIdentity } from "../../domain";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')
        if (!authorization) return res.status(401).json({ error: 'No token provided' })
        if (!authorization.startsWith('Bearer')) return res.status(401).json({ error: 'Invalid Bearer Token' })

        const token = authorization.split(' ').at(1)||''
        try{
            const payload = await jsonwebtokenmanager.validate<{id: string}>(token)
            if(!payload) return res.status(401).json({error: 'Invalid Token'})

            const user = await userModel.findById(payload.id)
            if (!user) return res.status(401).json({error: 'Invalid Token -user'})
            
            req.body.user=UserIdentity.fromObject(user)

            next()
        }catch(error){
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
        }
    }
}