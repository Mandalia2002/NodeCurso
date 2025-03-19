import express from 'express'
export class Server {

    private app=express()

    async start (){

        this.app.use(express.static('public'))

        console.log('Server Running')
        this.app.listen(3000, ()=>{
            console.log('Server aaa')
        })
    }
}