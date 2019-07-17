import { $ } from './utils'

export default function toast(txt) {
  const $toast = $('.toast')
  $toast.addClass('toast_animation')

  $toast.el.querySelector('.txt').innerHTML = txt
  setTimeout(() => {
    $toast.removeClass('toast_animation')
  }, 3000)
}
