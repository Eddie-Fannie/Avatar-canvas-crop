/**
 * Created by ezgoing on 14/9/2014.
 */
'use strict'
export default function (options) {
  const el = document.querySelector(options.imageBox)
  let obj = {
    state: {},
    ratio: 1,
    options: options,
    imageBox: el,
    thumbBox: el.querySelector(options.thumbBox),
    spinner: el.querySelector(options.spinner),
    image: new Image(),
    getDataURL: function () {
      const width = this.thumbBox.clientWidth
      const height = this.thumbBox.clientHeight
      const canvas = document.createElement('canvas')
      const dim = el.style.backgroundPosition.split(' ')
      const size = el.style.backgroundSize.split(' ')
      const dx = parseInt(dim[0]) - el.clientWidth / 2 + width / 2
      const dy = parseInt(dim[1]) - el.clientHeight / 2 + height / 2
      const dw = parseInt(size[0])
      const dh = parseInt(size[1])
      const sh = parseInt(this.image.height)
      const sw = parseInt(this.image.width)
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh)
      const imageData = canvas.toDataURL('image/png')
      return imageData
    },
    getBlob: function () {
      const imageData = this.getDataURL()
      const b64 = imageData.replace('data:image/png;base64,', '')
      const binary = atob(b64)
      const array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], {type: 'image/png'})
    },
    zoomIn: function (radionum = 1.25) {
      this.ratio *= radionum
      setBackground()
    },
    zoomOut: function (radionum = 0.8) {
      this.ratio *= radionum
      setBackground()
    }
  }
  const attachEvent = function (node, event, cb) {
    if (node.attachEvent) {
      node.attachEvent('on' + event, cb)
    } else if (node.addEventListener) {
      node.addEventListener(event, cb)
    } else {
    }
  }
  const detachEvent = function (node, event, cb) {
    if (node.detachEvent) {
      node.detachEvent('on' + event, cb)
    } else if (node.removeEventListener) {
      node.removeEventListener(event)
    }
  }
  const stopEvent = function (e) {
    if (window.event) e.cancelBubble = true
    else e.stopImmediatePropagation()
  }
  const setBackground = function () {
    const w = parseInt(obj.image.width) * obj.ratio
    const h = parseInt(obj.image.height) * obj.ratio
    const pw = (el.clientWidth - w) / 2
    const ph = (el.clientHeight - h) / 2
    el.setAttribute('style',
      'background-image: url(' + obj.image.src + '); ' +
      'background-size: ' + w + 'px ' + h + 'px; ' +
      'background-position: ' + pw + 'px ' + ph + 'px; ' +
      'background-repeat: no-repeat')
  }
  const imgMouseDown = function (e) {
    stopEvent(e)
    obj.state.dragable = true
    obj.state.mouseX = e.clientX
    obj.state.mouseY = e.clientY
  }
  const imgMouseMove = function (e) {
    stopEvent(e)
    if (obj.state.dragable) {
      const x = e.clientX - obj.state.mouseX
      const y = e.clientY - obj.state.mouseY
      const bg = el.style.backgroundPosition.split(' ')
      const bgX = x + parseInt(bg[0])
      const bgY = y + parseInt(bg[1])
      el.style.backgroundPosition = bgX + 'px ' + bgY + 'px'
      obj.state.mouseX = e.clientX
      obj.state.mouseY = e.clientY
    }
    // options.movedown.call()
  }
  const imgMouseUp = function (e) {
    stopEvent(e)
    obj.state.dragable = false
  }
  obj.spinner.style.display = 'block'
  obj.image.onload = function () {
    obj.spinner.style.display = 'none'
    setBackground()
    attachEvent(el, 'mousedown', imgMouseDown)
    attachEvent(el, 'mousemove', imgMouseMove)
    attachEvent(document.body, 'mouseup', imgMouseUp)
    // options.movedown.call(obj)
  }
  obj.image.src = options.imgSrc
  attachEvent(el, 'DOMNodeRemoved', function () {
    detachEvent(document.body, 'DOMNodeRemoved', imgMouseUp)
  })
  return obj
}
