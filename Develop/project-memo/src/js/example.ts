import { IExample } from '~/data/interfaces/IExample'
import { IExampleState } from '~/data/interfaces/state/IExampleState'
import { IRootState } from '~/data/interfaces/state/IRootState'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
 
type ExampleContext = ActionContext<IExampleState, IRootState>
 
export const ModuleName = 'example'
export const GetterTypes = {
  GET_EXAMPLE = 'GET_EXAPLE'
  ...
}
export const MutationTypes = {
  SET_EXAMPLE = 'SET_EXAMPLE'
  ...
}
export const ActionTypes = {
  UPDATE_EXAMPLE = 'UPDATE_EXAMPLE'
}
 
export const state = (): IExampleState => ({
  /**
   * IExampleState.ts의 state 변수들을
   * 초기값을 할당하여 선언해줍니다.
   */
})
 
export const getters: GetterTree<IExampleState, IRootState> = {
  [GetterTypes.GET_EXAMPLE]: (state) => {
    /*
     * state 값 반환
     */
  }
}
 
export const mutations: MutationTree<IExampleState> = {
  [MutationTypes.SET_EXAMPLE](state, payload) {
    /**
     * state 상태 수정
     */
  }
}
 
export const actions: ActionTree<IExampleState, IRootState> = {
  [ActionTypes.UPDATE_EXAMPLE]({ commit, rootState }, payload) {
    commit(MutationTypes.SET_EXAMPLE)
    /**
     * state 값을 직접 수정 및 변화시키는 것은 Mutation만 가능하기 때문에
     * Action은 Mutation을 커밋하여 Mutation이 실행되도록 합니다.
     */
  }
}