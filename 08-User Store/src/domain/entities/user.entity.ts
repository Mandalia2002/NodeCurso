import { CustomError } from "../error/custom.error";

export class UserIdentity {
    constructor(
        public id: string,
        public name: String,
        public email: String,
        public password: String,
        public role: String[],
        public valid: boolean,
        public img?: String,
    ) { }

    static fromObject = (object: { [key: string]: any }): UserIdentity => {
        const { id, _id, name, email, password, role, valid, img } = object

        if (!_id && !id) {
            throw CustomError.badrequest('Missing Id')
        }

        if (!name) {
            throw CustomError.badrequest('Missing name')
        }

        if (!email) {
            throw CustomError.badrequest('Missing email')
        }

        if (!password) {
            throw CustomError.badrequest('Missing password')
        }

        if (!role) {
            throw CustomError.badrequest('Missing rol')
        }

        if (valid == undefined) {
            throw CustomError.badrequest('Missing email')
        }

        return new UserIdentity(
            id || _id,
            name,
            email,
            password,
            role,
            valid,
            img
        )
    }
}