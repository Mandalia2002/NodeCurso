import { yarg } from "./config/plugins/yargs.plugin"

var b = 0, a=0, c= yarg.b, sa=yarg.s, fs = require('fs')

const as: Array<String> = []

fs.mkdir('outputs', { recursive: true }, (err: any) => {});

fs.appendFile(`outputs/tabla-${c}.txt`,'', { flag: 'w+' }, function (err: any) {
    if (err) throw err;
    table()
    console.log('File created!');
});

function table() {
    if(sa==true){console.log(`----------\nTabla del ${c}\n----------`)}
    while (b <= yarg.a) {
        if(sa==true){console.log(`${c} x ${b} = `, c * b);}
        a=c*b
        as.push(`${c} x ${b} = ${a}\n`)
        fs.appendFile(`outputs/tabla-${c}.txt`, as[b], { flag: 'a+' }, function (err: any) {
            if (err) throw err;
        });
        b++;
    }
}
