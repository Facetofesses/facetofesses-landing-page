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
  }

  initializeElements () {
    Object.assign(this.$els, {
      scrollBtn: selectClass('header-scroll')
    })
  }

  initializeEvents () {
    this.$els.scrollBtn.addEventListener('click', this.onScrollBtnClick.bind(this))
  }

  onEnter () {
    super.onEnter()
  }

  onEnterCompleted () {
    super.onEnterCompleted()
    this.background = new Background()
    this.background.start()
    TweenMax.to('.header', 0.7, {
      background: 'rgba(0, 0, 0, 0)'
    })
  }

  onLeave () {
    this.background.destruct()
  }

  onScrollBtnClick (e) {
    e.preventDefault()
    TweenMax.to(window, 0.8, {
      scrollTo: selectClass('header').offsetHeight,
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
