import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client Connected')

    ws.on('error', console.error);

    ws.on('message', function message(data) {

        console.log('received: %s', data);
        const payload={
            type:'custom-message',
            payload: data.toString()
        }
        ws.send(JSON.stringify(payload))
    });

    ws.send('sandia');

    ws.on('close',()=>{
        console.log('Client has gone...')
    })
});

console.log('Server running on port 3000')