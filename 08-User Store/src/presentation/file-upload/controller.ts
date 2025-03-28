import { Response, Request } from 'express'
import { CustomError } from '../../domain'
import { FileUpService } from '../services/file.service'
import { UploadedFile } from 'express-fileupload'

export class FileUpController {
    constructor(
        private readonly fileUp: FileUpService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return CustomError.internalserver('Internal Server Error')
    }

    uploadFile = async (req: Request, res: Response) => {
        const type = req.params.type
        const file = req.body.files.at(0) as UploadedFile

        this.fileUp.uploadFile(file, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res))
    }

    uploadMulti = async (req: Request, res: Response) => {
        const type = req.params.type
        const validtypes = ['users', 'products', 'categories']
        if (!validtypes.includes(type)) {
            return res.status(400).json({ error: `Invalid type: ${type}, valid ones ${validtypes}` })
        }

        const file = req.body.files as UploadedFile[]

        this.fileUp.uploadMultiple(file, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res))
    }
}