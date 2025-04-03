//Texto
const muestra = document.querySelector('#lbl-pending') //Espere...
const work = document.querySelector('.alert') //Ya no hay tickets
const titulo = document.querySelector('h1') //Escritorio
const sandia = document.querySelector('small') //Actual

//Botones
const siguiente = document.querySelector('#sig')
const final = document.querySelector('#fin')

let workingticket = null //si

const search = new URLSearchParams(window.location.search)
if (!search.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('Escritorio es requerido')
}

const desk = search.get('escritorio')
titulo.innerText = desk

function check(current = 0) {
    if (current === 0) {
        work.classList.remove('d-none')
    } else {
        work.classList.add('d-none')
    }
    muestra.innerHTML = current
}

async function tickets() {
    const nam = await fetch('/api/tickets/pending').then(resp => resp.json())
    check(nam.length)
}

async function getTicket() {
    await eliminar()
    const { status, ticket, message } = await fetch(`/api/tickets/draw/${desk}`).then(resp => resp.json())

    if (status === 'error') {
        wwww.innerHTML = message
        return
    }
    workingticket = ticket
    sandia.innerHTML = ticket.number
}

async function eliminar() {
    if (!workingticket) return
    const { status, message } = await fetch(`/api/tickets/done/${workingticket.id}`, {
        method: 'PUT'
        }).then(resp=> resp.json())
    if(status==='ok'){
        workingticket=null
        sandia.innerHTML='Nadie'
    }
}


function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)
        if (type !== 'ticket') return
        check(payload)
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}


siguiente.addEventListener('click', getTicket)
final.addEventListener('click', eliminar)
tickets()
connectToWebSockets();