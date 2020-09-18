import jQuery from "jquery";
import "cropper";

export default {
  deep: true,
  bind(el, binding, vnode) {
    // console.log(vnode.context.$emit)
    console.log(binding)
    console.log("directive bind");
    jQuery(el).cropper("destroy");
    setTimeout(() => {
      jQuery(el).cropper(binding.value);
    }, 0);
    vnode.context.$on('rotate', deg => {
      jQuery(el).cropper('rotate', deg)
    })
  },
  update(el, binding, vnode, oldVnode) {
    console.log("directive update");
    console.log(el, binding);

    (function (event) {
      vnode.context.$emit("crop", event);
    })()
  },
  unbind(el, binding, vnode) {
    console.log("directive unbind");
    jQuery(el).cropper("destroy");
    vnode.context.$off('rotate')
  }
};
