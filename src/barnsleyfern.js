/*
 * To learn about the Barnsley fern, visit the wikipedia
 * article: https://en.wikipedia.org/wiki/Barnsley_fern
 */

let canvas, c

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

let x = 0,
    y = 0

function f1() {
    x = 0
    y = 0.16 * y
}

function f2() {
    x =  0.85 * x + 0.04 * y
    y = -0.04 * x + 0.85 * y + 1.6
}

function f3() {
    x = 0.2  * x - 0.26 * y
    y = 0.23 * x + 0.22 * y + 1.6
}

function f4() {
    x = -0.15 * x + 0.28 * y
    y =  0.26 * x + 0.24 * y + 0.44
}

function drawPoint() {
    let percentage = Math.random()

    if      (percentage <= 0.85) f2()
    else if (percentage <= 0.92) f3()
    else if (percentage <= 0.99) f4()
    else                         f1()

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