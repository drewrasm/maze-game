var cellWidth = 10
var cellHeight = 10

var canvas = document.getElementById('id-canvas')
var context = canvas.getContext('2d');

const renderMaze = (maze) => {
    cellWidth = canvas.width / maze.length
    cellHeight = canvas.height / maze[0].length
    for(let row of maze) {
        for(let cell of row) {
            drawCell(cell)
        }
    }
}
window.renderMaze = renderMaze


console.log(canvas)

const clearMaze = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


// function drawRectangle(rect) {
//     context.save();

//     context.translate(rect.center.x, rect.center.y );
//     context.translate(-rect.center.x, -rect.center.y);

//     context.strokeStyle = rect.stroke;
//     context.strokeRect((rect.center.x - rect.size.x / 2) + .5, (rect.center.y - rect.size.y / 2) + .5, rect.size.x, rect.size.y);

//     context.restore();
// }

const drawCell = (cell) => {
    let x = cell.x == 0 ? 0 : cellWidth * cell.x
    let y = cell.y == 0 ? 0 : cellHeight * cell.y
    context.save();

    context.beginPath();
    context.moveTo(x, y)

    cell.top ? context.lineTo(x + cellWidth, y) : context.moveTo(x + cellWidth, y)
    cell.right ? context.lineTo(x + cellWidth, y + cellHeight) : context.moveTo(x + cellWidth, y + cellHeight)
    cell.bottom ? context.lineTo(x, y + cellHeight) : context.moveTo(x, y + cellHeight)
    cell.left ? context.lineTo(x, y) : context.moveTo(x, y)
    context.stroke()
}
