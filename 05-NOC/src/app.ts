import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDB } from './data/mongo';
import { Server } from './presentation/server'
(async () => {
    main();
})()

async function main() {
    await MongoDB.connect({
        mongoURL: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    //-------------------------------------

    //Conexion de Prisma con PostgreSQL y consulta
    const prisma = new PrismaClient()
    /*const newLog = await prisma.logModel.create({
        data:{
            level:'LOW',
            message: 'prueba',
            origin: 'App.ts'
        }
    })*/

    const logs = await prisma.logModel.findMany({
        where:{
            level:'HIGH'
        }
    })
    console.log({logs})

    //----------------------------------------------------

    //Crear coleccion (tablas, documento osea un registro)
    // const newLog =await LogModel.create({
    //     message: 'Mensaje de prueba de mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // })

    //----------------------------

    // await newLog.save() //Crea un registro
    // console.log(newLog)

    //----------------------------

    // const logs = await LogModel.find()
    // console.log(logs [0].level) //Consulta aquel registro

    
    Server.start();
}