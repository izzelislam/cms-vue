import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { useFetchApi } from "../composable/usefetchApi"

export const useCategoryStore = defineStore("category", {

  state: () => ({
    loading: false,
    categories: [],
    success: '',
    errors: []
  }),

  actions: {
    async getCategories() {
      try {
        this.loading = true
        const response = await useFetchApi().get(`/categories`)
        this.categories = response.data
        this.loading = false
      } catch (error) {
        console.log(error, 'get data');

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

    async deleteCategories(id) {
      try {
        this.loading = true
        const response = await useFetchApi().delete(`/categories/${id}`)
        this.getCategories()
        this.success = response.message
        this.loading = false
      } catch (error) {
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

    async storeCategory(payload) {
      try {

        this.loading = true
        const response = await useFetchApi().post("/categories", payload)
        this.getCategories()
        this.success = response.message
        this.loading = false

        return response
      } catch (error) {
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
    }
  }
})