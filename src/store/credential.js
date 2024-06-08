import { defineStore } from "pinia";
import { parse, stringify } from 'zipson'


export const useCredentialStore = defineStore("_c", {
  state: () => ({
    token: null,
    user: null
  }),
  persist: {
    storage: sessionStorage,
    paths: ['token', 'user'],
    serializer: {
      deserialize: parse,
      serialize: stringify
    }
  }
})