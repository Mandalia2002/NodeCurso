import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(()=>{
    main()
})()

function main(){
    console.log('main')
    const ser= new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
        publicpath: envs.PUBLIC_PATH,
    })
    ser.start()
}