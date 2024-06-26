import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useFetchApi } from "../composable/usefetchApi";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      users: [],
      user: {},
      errors: {},
      error: null,
      loading: false
    }
  },
  actions: {
    async getUsers(){
      try {
        this.loading = true
        const response = await useFetchApi().get('/users')
        this.users = response.data
        this.loading = false
      } catch (error) {
        this.loading = false

        const err = error.data.message
        if (typeof(err) == 'object') {
          this.errors = err
        }else{
          this.error = err
        }

        if (error.status == 401) {
          const authStore = useAuthStore()
          await authStore.logout()
        }
        throw error
      }
    },

    async findUser(id){
      try {
        this.loading = true
        const response = await useFetchApi().get(`/users/${id}`)
        this.user = response.data
        this.loading = false
      } catch (error) {
        this.loading = false

        const err = error.data.message
        if (typeof(err) == 'object') {
          this.errors = err
        }else{
          this.error = err
        }

        if (error.status == 401) {
          const authStore = useAuthStore()
          await authStore.logout()
        }
        throw error
      }
    },

    async updateUser(id, payload){
      try {
        this.loading = true
        const response = await useFetchApi().post(`/users/${id}?_method=PUT`, payload)
        this.getUsers()
        this.loading = false
        return response
      } catch (error) {
        this.loading = false
        const err = error.data.data
        if (typeof(err) == 'object') {
          this.errors = err
        }else{
          this.error = err
        }

        if (error.status == 401) {
          const authStore = useAuthStore()
          await authStore.logout()
        }
        throw error
      }
    },

    async deleteUser(id){
      try {
        this.loading = true
        const response = await useFetchApi().delete(`/users/${id}`)
        this.getUsers()
        this.loading = false
        return response
      } catch (error) {
        this.loading = false
        const err = error.data.message
        if (typeof(err) == 'object') {
          this.errors = err
        }else{
          this.error = err
        }

        if (error.status == 401) {
          const authStore = useAuthStore()
          await authStore.logout()
        }
        throw error
      }
    },
    async storeUser(payload){
      try {
        this.loading = true
        const response = await useFetchApi().post('/users', payload)
        this.getUsers()
        this.loading = false
        return response
      } catch (error) {
        this.loading = false
        const err = error.data.data
        if (typeof(err) == 'object') {
          this.errors = err
        }else{
          this.error = err
        }

        if (error.status == 401) {
          const authStore = useAuthStore()
          await authStore.logout()
        }
        throw error
      }
      
    }
  }
})