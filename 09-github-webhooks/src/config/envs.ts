import 'dotenv/config'
import {get} from 'env-var'

export const Envs={
    PORT: get('PORT').required().asPortNumber(),
    Discord_webhook_url: get('Discord_webhook_url').required().asString(),
    SECRET_TOKEN: get('Secret_Token').required().asJsonArray()
}