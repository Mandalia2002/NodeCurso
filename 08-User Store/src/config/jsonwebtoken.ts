import jwt, { SignOptions } from 'jsonwebtoken'
import { envs } from './envs';

const seed = envs.JWT_SEED

export class jsonwebtokenmanager {

    static generate(payload: any, duration: string = '2h') {
        return new Promise((resolve) => {
            jwt.sign(payload, seed, { expiresIn: duration } as SignOptions, (err, token) => {
                if (err) return resolve(null);

                resolve(token)
            })
        })

    }

    static validate<T>(token: string): Promise<T|null> {
        return new Promise((resolve) => {
            jwt.verify(token, seed, (err, decoded) => {
                if (err) return resolve(null)

                resolve(decoded as T)
            })
        })
    }

}