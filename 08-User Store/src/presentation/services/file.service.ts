import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import path from 'path'
import { UUID } from '../../config'
import { CustomError } from '../../domain'

export class FileUpService {
    constructor(
        private readonly uuid = UUID.v4
    ) { }

    private checkFolder(folder: string) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
    }

    async uploadFile(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtension: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        console.log(file)
        try {
            const fileext = file.mimetype.split('/').at(1) ?? ''
            if(!validExtension.includes(fileext)){
                throw CustomError.badrequest(`Invalid Extension:${fileext}, valid extensions: ${validExtension}`)
            }


            const desti = path.resolve(__dirname, '../../../', folder)
            this.checkFolder(desti)

            const  fileN = `${this.uuid()}.${fileext}`

            file.mv(`${desti}/${fileN}`)

            return {fileN}
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async uploadMultiple(
        file: UploadedFile[],
        folder: string = 'uploads',
        validExtension: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        const filesN=await Promise.all(
            file.map(files=>this.uploadFile(files, folder, validExtension))
        )
        return filesN
     }
}