import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    loading: false
  }),
  actions: {
    login(token) {
      this.token = token
    }
  },
  persist: true
})