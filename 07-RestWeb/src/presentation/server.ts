import express, { Router } from 'express'
import compression from 'compression'
import path from 'path'

interface Options {
    port: number;
    routes: Router;
    publicpath?: string;
}

export class Server {

    private app=express()
    private readonly port: number
    private readonly publicpath: string
    private readonly routes: Router

    constructor(ops: Options){
        const {port, routes ,publicpath= 'public'}=ops
        this.port= port;
        this.routes= routes
        this.publicpath= publicpath
    }

    async start (){
        //*Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded())
        this.app.use(compression())

        //*Public Folder
        this.app.use(express.static(this.publicpath))

        //*Routes
        this.app.use(this.routes)

        //* SPA
        this.app.get('*', (req,res)=>{
            const inpath = path.join(__dirname + `../../../${this.publicpath}/index.html`)
            res.sendFile(inpath)
            return;
        })

        console.log('Server Running')
        this.app.listen(this.port, ()=>{
            console.log(`Server aaa ${this.port}`)
        })
    }
}