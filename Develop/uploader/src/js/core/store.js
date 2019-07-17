import History from './History'
const initialState = {
  activeTool: '',
  isRedo: false,
  isUndo: false,
  isOriginal: false,
  isLoaded: false,
}

function reducer(state = initialState, action) {
  if (action.type === 'ACTIVE_TOOL') {
    return {
      ...state,
      activeTool: action.id,
    }
  } else if (action.type === 'CANCEL_TOOL') {
    return {
      ...state,
      activeTool: '',
      isRedo: History.hasNext(),
      isUndo: History.hasBefore(),
      isOriginal: true,
    }
  } else if (action.type === 'APPLY_TOOL') {
    return {
      ...state,
      activeTool: '',
      isRedo: History.hasNext(),
      isUndo: History.hasBefore(),
      isOriginal: true,
    }
  } else if (action.type === 'LOADED_IMAGE') {
    return {
      ...state,
      isLoaded: true,
    }
  } else if (action.type === 'UNLOADED_IMAGE') {
    return {
      ...state,
      isLoaded: false,
    }
  } else if (action.type === 'UPDATE_HISTORY') {
    return {
      ...state,
      isRedo: History.hasNext(),
      isUndo: History.hasBefore(),
      isOriginal: true,
    }
  } else {
    return state
  }
}

function createStore(reducer) {
  let state
  let listeners = []

  const getState = () => state

  /**
   * dispatch
   * @param action - { module, type }
   */
  const dispatch = action => {
    // console.log(listeners)
    state = reducer(state, action)
    const findModule = (target, value) => {
      // undefined 인 경우는 global
      if (typeof value === 'undefined') {
        return true

        // 문자열인 경우
      } else if (typeof value === 'string') {
        return target === value
      }

      // 배열인 경우
      return value.includes(target)
    }

    listeners
      .filter(l => findModule(l.module, action.module))
      .forEach(({ listener }) => {
        listener(state)
      })
  }

  /**
   *
   * @param module - dispatch 할때 모듈을 받기때문에 해당하는 모듈 listerner 만 호출하게 된다.
   * @param listener
   * @return {function()}
   */
  const subscribe = (module, listener) => {
    listeners.push({ module, listener })
    return () => {
      listeners = listeners.filter(l => l.listener !== listener)
    }
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

export { createStore, reducer }
