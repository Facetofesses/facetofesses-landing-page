// import {randomInt} from './utils/index'

export default class Canvas {
  constructor () {
    this.domElement = document.getElementById('canvas')

    this.context = this.domElement.getContext('2d')
    this.setSize()

    this.fillColor = '#2D2D2D'
  }

  getContext () {
    return this.context
  }

  setSize () {
    this.domElement.width = window.innerWidth
    this.domElement.height = window.innerHeight
  }

  getSize () {
    return {
      width: this.domElement.width,
      height: this.domElement.height
    }
  }

  clear () {
    const {width, height} = this.getSize()
    this.context.clearRect(0, 0, width, height)

    this.context.save()
    this.context.fillStyle = this.fillColor
    this.context.fillRect(0, 0, width, height)
    this.context.restore()
  }
}
