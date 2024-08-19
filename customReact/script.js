let root = document.getElementById('root')

let reactElement = {
    type: 'a',
    attribute:{
        target: '_blank',
        href: 'https://google.com'
    },
    text: 'Click Me to visit google'
}
// for(let i in reactElement){
//     console.log(reactElement[i]);
// }
function insertReact(root, reactElement){
    let newElement = document.createElement(reactElement.type)
    for( let i in reactElement.attribute){
        newElement.setAttribute(i,reactElement.attribute[i] )
    }
    newElement.innerHTML = reactElement.text
    root.appendChild(newElement)
}

insertReact(root, reactElement)