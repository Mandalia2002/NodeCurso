import {yarg as nam, yarg} from './config/plugins/yargs.plugin';
import {Server} from './presentation/server-app';

//console.log(process.argv);

//console.log(yarg.b);

(async()=>{
   await main();
    //console.log('fin de programa');
})();

async function main(){
    const{b:base, a:limit, s:showTable, d:destination, n:name } = yarg;
    Server.run({base, limit, showTable, destination, name});

}
