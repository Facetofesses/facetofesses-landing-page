import Page from './Page'
import Background from '../Background'
import {selectClass} from '../utils/index'
import '../lib/splittext'
import 'gsap/src/uncompressed/plugins/ScrollToPlugin'

const dbg = debug('app:HomePage')

export default class HomePage extends Page {
  constructor () {
    super()
    dbg('Init HomePage')

    this.background = new Background()
  }

  initializeElements () {
    Object.assign(this.$els, {
      title: selectClass('header-title'),
      scrollBtn: selectClass('header-scroll')
    })
  }

  initializeEvents () {
    this.$els.scrollBtn.addEventListener('click', this.onScrollBtnClick.bind(this))
  }

  onEnter () {
    super.onEnter()

    this.animateTitle()
    this.background.start()
  }

  animateTitle () {
    const titleChars = new SplitText(this.$els.title, {type: 'lines'}).lines
    TweenMax.staggerFrom(titleChars, 0.3, {
      y: '+=20',
      delay: 0.3,
      autoAlpha: 0
    }, 0.15)
  }

  onScrollBtnClick (e) {
    e.preventDefault()
    TweenMax.to(window, 0.8, {
      scrollTo: window.innerHeight,
      ease: Power2.easeInOut
    })
  }

  getTransition (options) {
    switch (options.datas.transition) {
      case 'my-custom-transition':
        return {
          start: function () {
            this.newContainerLoading.then(this.hide.bind(this))
          },

          hide: function () {
            this.done()
          }
        }
      default:
        break
    }
  }
}
