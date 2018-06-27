/*
 * To learn about the Barnsley fern, visit the wikipedia
 * article: https://en.wikipedia.org/wiki/Barnsley_fern
 */

let canvas, c
let fern = {}

async function setupWebAssembly() {
    const response = await fetch('barnsley_fern.wasm')
    const buffer   = await response.arrayBuffer()
    const module   = await WebAssembly.compile(buffer)
    const instance = await WebAssembly.instantiate(module)
    
    fern = instance.exports
}

setupWebAssembly()

function canvasSetup() {
    canvas = find('canvas')
    canvas.width  = 4.8378 * detail
    canvas.height = 9.9983 * detail

    c = canvas.getContext('2d')
    c.fillStyle = '#fff';
}

function Point(x, y) {
    c.fillRect(x, y, 5, 5)
}

let x = 0.0,
    y = 0.0

function drawPoint() {
    let f
    const percentage = Math.random()

    if      (percentage <= 0.85) f = 2
    else if (percentage <= 0.92) f = 3
    else if (percentage <= 0.99) f = 4
    else                         f = 1

    x = fern.next_x(x, y, f)
    y = fern.next_y(x, y, f)

    new Point(
               (2.182 + x) * detail, 
        canvas.height + y  * detail * (-1)
    )

    /* 
     * Multiplied by 'detail' to scale the canvas
     * and remove blurriness at the same time.
     * 
     * Multiplied by -1 to revert the y-axis, since
     * traditional canvas elements have their origo
     * in the top-left corner.
     */
}

function drawFern(numOfPoints) {
    if (Object.keys(fern).length === 0) return

    if (procedural) {
        if (speed > 0) {
            for (let i = 0; i < speed; i++) {
                drawPoint()
            }
        } else {
            drawPoint()
        }
    } else {
        for (let i = 0; i < numOfPoints; i++) {
            drawPoint()
        }
    }
}

function refreshCanvas(type) {
    clearInterval(drawing)

    if (type === 'full') {
        x = 0
        y = 0

        canvasSetup()
    }

    if (procedural) {
        if (speed > 0) drawing = setInterval(drawFern, 10)
        else           drawing = setInterval(drawFern, -speed)
    } else {
        drawFern(numOfPoints)
    }
}