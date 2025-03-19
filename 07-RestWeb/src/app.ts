import { Server } from "./presentation/server"

(()=>{
    main()
})()

function main(){
    console.log('main')
    const ser= new Server()
    ser.start()
}