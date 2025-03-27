import { envs } from "../../config"
import { categoryModel, MongoDB, productModel, userModel } from "../mongo"
import { seedData } from "./data"

(async()=>{
    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoURL: envs.MONGO_URL
    })
    
    await main()
    await MongoDB.disconnect()
})()

const rand=(x: number)=>{
    return Math.floor(Math.random()*x)
}

async function main() {
    await Promise.all([
        userModel.deleteMany(),
        categoryModel.deleteMany(),
        productModel.deleteMany()
    ])

    const users  = await userModel.insertMany(seedData.users)

    const categories  = await categoryModel.insertMany(seedData.categories.map(
        category=>{
        return{
            ...category,
            user:users[rand(seedData.users.length-1)].id
        }
    }))

    const products  = await productModel.insertMany(seedData.products.map(
        product=>{
            return{
                ...product,
                user: users[rand(seedData.users.length-1)]._id,
                category:categories[rand(seedData.categories.length-1)]._id
            }
        }
    ))

}