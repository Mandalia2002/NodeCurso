const muestra = document.querySelector('#lbl-new-ticket')
const agrega = document.querySelector('button')

async function tickets() {
    const nam = await fetch('/api/tickets/last').then(resp=> resp.json())
    muestra.innerHTML=nam
}

tickets()

async function add(){
    const nom = await fetch('/api/tickets/',{
        method: 'POST'
    }).then(resp=> resp.json())

    muestra.innerHTML=nom.number
}

agrega.addEventListener('click', add)