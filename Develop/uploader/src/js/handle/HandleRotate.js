import { $ } from '../lib/utils'
import * as ACTION_TYPE from '../constants'

const HandleRotate = pastel => {
  let angleInDegrees = 0
  let horizon = 1
  let vertical = 1

  pastel.EventManager.offAll()
  pastel.EventManager.on(
    'click',
    () => {
      pastel.store.dispatch({
        module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
        type: ACTION_TYPE.APPLY_TOOL,
      })
    },
    $('.btn_apply').el
  )

  $('#rotateLeftBtn').on('click', () => {
    angleInDegrees = (angleInDegrees - 90) % 360
    drawRotated(angleInDegrees, horizon, vertical)
  })

  $('#rotateRightBtn').on('click', () => {
    angleInDegrees = (angleInDegrees + 90) % 360
    drawRotated(angleInDegrees, horizon, vertical)
  })

  $('#scaleLeftRightBtn').on('click', () => {
    horizon === 1 ? (horizon = -1) : (horizon = 1)
    drawRotated(angleInDegrees, horizon, vertical)
  })

  $('#scaleTopBottomBtn').on('click', () => {
    vertical === 1 ? (vertical = -1) : (vertical = 1)
    drawRotated(angleInDegrees, horizon, vertical)
  })

  const drawRotated = (degrees, horizon, vertical) => {
    const frame = pastel.getFrame()
    const width = frame.width
    const height = frame.height
    pastel.Api.rotate(width, height, degrees, horizon, vertical)
  }
}

export default HandleRotate
