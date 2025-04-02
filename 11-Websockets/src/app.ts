import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client Connected')

    ws.on('error', console.error);

    ws.on('message', function message(data) {

        const payload=JSON.stringify({
            type:'custom-message',
            payload: data.toString()
        })
        //ws.send(JSON.stringify(payload))

        wss.clients.forEach(function each(client) {
            // if (client.readyState === WebSocket.OPEN) {  //Esta madre es para hacer un chat :00000
            //   client.send(payload, { binary: false });
            // }

            if(client !== ws && client.readyState=== WebSocket.OPEN){ //Esto sirve como chat tambien pero no puedes mirar tus propios mensajes 
                client.send(payload, {binary: false})
            }
          });
    });

    ws.send('sandia');

    ws.on('close',()=>{
        console.log('Client has gone...')
    })
});

console.log('Server running on port 3000')