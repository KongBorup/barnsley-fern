const find = document.querySelector.bind(document)
const id   = document.getElementById.bind(document)

let speed, detail, procedural, numOfPoints, drawing

window.onload = () => {
    find('#settings img').onclick = () => {
        find('#settings').classList.toggle('open')
    }

    id('refresh').onclick = () => {
        id('refresh').classList.add('spin')

        setTimeout(() => {
            id('refresh').classList.remove('spin')
        }, 350)

        refreshCanvas('full')
    }

    speed       = id('speed').value,
    detail      = id('detail').value,
    procedural  = id('procedural').checked,
    numOfPoints = id('numOfPoints').value

    id('speed').onchange = () => {
        speed = id('speed').value

        if (speed === 0) speed++
        
        refreshCanvas()
    }

    id('detail').onchange = () => {
        detail = id('detail').value
        
        refreshCanvas('full')
    }

    id('procedural').onchange = () => {
        procedural = id('procedural').checked

        id('points').classList.toggle('visible')

        refreshCanvas('full')
    }

    id('numOfPoints').onchange = () => {
        numOfPoints = id('numOfPoints').value

        refreshCanvas('full')
    }

    canvasSetup()
    refreshCanvas()
}