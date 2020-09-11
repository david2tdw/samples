import Toast from './Toast.vue'

Toast.install = (Vue) => {
  Vue.prototype.$toast = (msg, duration) => {
    if (!msg) {
      return
    }
    duration = duration || 1500
    const constroct = Vue.extend(Toast)
    const instance = new constroct()
    instance.msg = msg|| ''

    const tpl = instance.$mount().$el

    document.querySelector('body').appendChild(tpl)
    setTimeout(() => {
      document.querySelector('body').removeChild(tpl)
    }, duration)
  }
}

export default Toast