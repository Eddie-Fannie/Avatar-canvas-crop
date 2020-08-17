export const attachEvent = function(node,event, cb) {
    if (node.attachEvent) {
        node.attachEvent('on' + event, cb)
    } else if (node.addEventListener) {
        node.addEventListener(event, cb)
    }
}
export const detachEvent = function(node, event, cb) {
    if (node.detachEvent) {
        node.detachEvent('on' + event, cb)
    } else if (node.removeEventListener) {
        node.removeEventListener(event)
    }
}

export const stopEvent = function(e) {
    if(window.event) e.cancelBubble = true
    else e.stopImmediatePropagation()
}