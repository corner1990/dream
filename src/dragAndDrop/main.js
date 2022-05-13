
let box = document.querySelector('.drag-wrap')
let leftBox = document.querySelector('.left-box');
let rightBox = document.querySelector('.right-box');

console.log('left', leftBox, 'right', rightBox)

let triggerBtn = leftBox.querySelector('.drag-btn')
console.log('triggerBtn', triggerBtn)


const createEl = () => {
    const el = document.createElement('button')
    el.innerHTML = 'hello drap';

    el.classList.add('drag-btn-copy');
    box.appendChild(el)
    
    return el;
}

let dragEL = null;
triggerBtn.addEventListener('mousedown', () => {
    let el = dragEL = createEl();
    console.log('mousedown', el, triggerBtn)
})

box.addEventListener('mousemove', (e) => {
    
    const leftPx = e.clientX;
    const topPx = e.clientY;
    if (dragEL) {
        dragEL.style.top = topPx + 'px';
        dragEL.style.left = leftPx + 'px';
    }
   

})

// box.addEventListener('mouseout', () => {
//     dragEL && box.removeChild(dragEL)
// })

rightBox.addEventListener('drag', (e) => {
    console.log(e)
})