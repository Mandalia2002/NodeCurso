import { Server } from 'http'
import {WebSocketServer, WebSocket} from 'ws'

interface Options{
    server: Server
    path?: string
}

export class wssService{
    private static _instance:wssService
    private wss: WebSocketServer

    private constructor(option: Options){
        const{server,path='/ws'}=option

        this.wss= new WebSocketServer ({server, path})
        this.start()
    }

    static get instanceof():wssService{
        if(!wssService._instance){
            throw 'wssService is not initialized'
        }
        return wssService._instance
    }

    static initWss(option: Options){
        wssService._instance=new wssService(option)
    }

    public send(type: string, payload: Object){
        this.wss.clients.forEach(client=>{
            if(client.readyState=== WebSocket.OPEN){
                client.send(JSON.stringify({type,payload}))
            }
        })
    }

    public start(){
        this.wss.on('connection', (ws: WebSocket)=>{
            console.log('Client connected')
            ws.on('close', ()=>console.log('Client Disconnected'))
        })
    }
}