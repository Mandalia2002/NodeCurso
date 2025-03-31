import express from 'express'
import { Envs } from './config/'
import { GithubController } from './presentation/github/controller'

(()=>{
    main()
})()

function main(){
    const app = express()

    app.use(express.json())

    const controller = new GithubController()

    app.post('/api/github',controller.webHookHandler)

    app.listen(Envs.PORT, ()=>{
        console.log(`App Running on port ${Envs.PORT}`)
    })
}