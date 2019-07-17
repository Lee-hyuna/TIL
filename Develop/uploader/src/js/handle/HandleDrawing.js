import { $ } from '../lib/utils'

const handleDrawing = pastel => {
  const container = $('.layer').el

  const drawingPalette = () => {
    bindColorPick()
    bindBrushSize()
    bindBrushTransparent()
  }

  const bindColorPick = () => {
    const colorPicker = container.querySelector('#color-picker')
    colorPicker.addEventListener('change', e => pastel.Api.watchColorPicker(e))
  }

  const bindBrushSize = () => {
    const brushSize = container.querySelector('#drawing-size')
    const slider = $('#brushSize').el
    const num = brushSize.querySelector('.value')

    slider.addEventListener('input', e => {
      pastel.Api.watchSizeRange(e)
      num.innerHTML = e.target.value
    })
  }

  const bindBrushTransparent = () => {
    const brushTransparent = container.querySelector('#drawing-transparent')
    const slider = $('#brushTransparent').el
    const num = brushTransparent.querySelector('.value')

    slider.addEventListener('input', e => {
      pastel.Api.watchTransparentRange(e)
      num.innerHTML = e.target.value
    })
  }

  drawingPalette()
}

export default handleDrawing
