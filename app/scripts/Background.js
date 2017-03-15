import Canvas from './Canvas'
import CurveEffect from './CurveEffect'
import Raf from 'raf'
import {selectClass} from './utils/index'

export default class Background {
  constructor () {
    this.canvas = new Canvas()
    this.canvasCtx = this.canvas.getContext()
    this.rafId = null
    this.scroll = 0

    window.addEventListener('resize', this.onResize.bind(this))
    /* window.addEventListener('scroll', () => {
      TweenMax.to(this, 0.2, {
        scroll: window.scrollY
      })
    }) */
  }

  start () {
    this.define()
    this.loop()
  }

  destruct () {
    cancelAnimationFrame(this.rafId)
  }

  onResize () {
    this.canvas.setSize()
    this.define()
  }

  define () {
    this.curveEffects = []

    selectClass('js-curve-effect', true).forEach((el) => {
      const curveEffect = new CurveEffect({
        canvas: this.canvas,
        context: this.canvasCtx,
        type: el.getAttribute('data-type'),
        domElement: el,
        colors: [el.getAttribute('data-color-from'), el.getAttribute('data-color-to')]
      })

      this.curveEffects.push(curveEffect)
    })

    this.curveEffects.reverse()
  }

  update () {
    this.curveEffects.forEach((curveEffect) => {
      curveEffect.update()
    })
  }

  render () {
    this.canvas.clear()
    // this.canvasCtx.setTransform(1, 0, 0, 1, 0, -this.scroll)

    this.curveEffects.forEach((curveEffect) => {
      curveEffect.render()
    })
  }

  loop () {
    this.update()
    this.render()

    this.rafId = Raf(this.loop.bind(this))
  }
}
