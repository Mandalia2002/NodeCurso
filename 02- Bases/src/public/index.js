const {getAge} =require ('../public/get-age.plugin');
const {v4} =require ('../public/get-uuid.plugin');
const {http} =require ('../public/http-client');
const buildlogger = require ('./logger.plugin')

module.exports={
    getAge,
    v4,
    http,
    buildlogger,
}