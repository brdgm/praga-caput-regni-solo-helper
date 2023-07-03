import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'
import { name } from '@/../package.json'

const LOCALSTORAGE_KEY = `${name}.store`

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  turns: Turn[]
}
export interface Setup {
  
}
export interface Turn {
  turn: number
  round: number
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {},
    turns: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    resetGame(state : State) {
      state.turns = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
