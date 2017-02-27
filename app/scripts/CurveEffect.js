import {randomInt, randomSign} from './utils'

export default class CurveEffect {
  constructor (options) {
    this.canvas = options.canvas
    this.context = options.context
    this.domElement = options.domElement
    this.colors = options.colors

    this.definePositionning()
    this.defineGradient()
    this.defineAnimatedPoints()
    this.animatePoint()
  }

  defineGradient () {
    const {width} = this.canvas.getSize()
    this.gradient = this.context.createLinearGradient(0, 0, width, this.domElement.offsetHeight)

    this.gradient.addColorStop(0, this.colors[0])
    this.gradient.addColorStop(1, this.colors[1])
  }

  getPadding () {
    return window.innerWidth < 790 ? 30 : 80
  }

  defineAnimatedPoints () {
    const width = this.canvas.getSize().width
    const pointNumber = window.innerWidth < 790 ? 4 : 5

    this.animatedPoints = []

    for (let i = width; i > width / pointNumber; i -= width / pointNumber) {
      this.animatedPoints.push({
        x: i,
        y: this.domElementTop + this.domElement.offsetHeight
      })
    }

    this.animatedPoints.push({
      x: 0,
      y: this.domElementTop + this.domElement.offsetHeight
    })
  }

  animatePoint () {
    window.setInterval(() => {
      const padding = this.getPadding()
      const moveY = randomInt(0, padding) * randomSign()

      TweenMax.staggerTo(this.animatedPoints, 3, {
        y: this.domElementTop + this.domElement.offsetHeight + moveY,
        ease: Linear.easeNone
      }, 1)
    }, 3000)
  }

  definePositionning () {
    this.domElementTop = this.domElement.getBoundingClientRect().top + window.pageYOffset
  }

  update () {

  }

  render () {
    let xc = 0
    let yc = 0
    let i = 0
    this.context.save()
    this.context.beginPath()

    this.context.fillStyle = this.gradient

    this.context.shadowColor = 'rgba(36, 42, 46, 0.4)'
    this.context.shadowBlur = 40

    this.context.moveTo(0, this.domElementTop - this.getPadding())
    this.context.lineTo(this.canvas.getSize().width, this.domElementTop - this.getPadding())
    this.context.lineTo(this.animatedPoints[0].x, this.animatedPoints[0].y)

    for (i = 1; i < this.animatedPoints.length - 2; i++) {
      const point = this.animatedPoints[i]

      xc = (point.x + this.animatedPoints[i + 1].x) / 2
      yc = (point.y + this.animatedPoints[i + 1].y) / 2
      this.context.quadraticCurveTo(point.x, point.y, xc, yc)
    }

    this.context.quadraticCurveTo(this.animatedPoints[i].x, this.animatedPoints[i].y, this.animatedPoints[i + 1].x, this.animatedPoints[i + 1].y)

    this.context.closePath()
    this.context.fill()

    this.context.restore()
  }
}
