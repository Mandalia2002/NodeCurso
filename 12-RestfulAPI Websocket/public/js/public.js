async function render(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {
        if (i >= 4) break
        const ticket = tickets[i]
        if (!ticket) continue
        const tick = document.querySelector(`#lbl-ticket-0${i + 1}`)
        const desk = document.querySelector(`#lbl-desk-0${i + 1}`)
        tick.innerHTML = `Ticket ${ticket.number}`
        desk.innerHTML = ticket.handleDesk

    }
}

async function current() {
    const tickets = await fetch('/api/tickets/working-on').then(resp => resp.json())
    render(tickets)
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)
        if (type !== 'ticket') return
        render(payload)
    };

    socket.onclose = (event) => {
        setTimeout(() => {
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}

current();
connectToWebSockets();