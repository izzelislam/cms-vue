import { defineStore } from "pinia";
import { useFetchApi } from "../composable/usefetchApi"
import { useAuthStore } from "./auth"


export const useArticleStore = defineStore("article", {
  state: () => {
    return {
      article: {},
      articles: [],
      loading: false,
      errors: ''
    }
  },
  actions: {
    async getArticleById(id) {
      try {
        this.loading = true
        const response = await useFetchApi().get(`/articles/${id}`)
        this.article = response.data
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
    async getArticles() {
      try {
        this.loading = true
        const response = await useFetchApi().get(`/articles`)
        this.articles = response.data
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
    async storeArticle(payload) {
        try {
          this.loading = true
          const response = await useFetchApi().post('/articles', payload)
          this.article = response.data
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
      },

    async deleteArticle(id) {
      try {
        this.loading = true
        const response = await useFetchApi().delete(`/articles/${id}`)
        this.getArticles()
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
    },

    async updateArticle(id, payload) {
      try {
        this.loading = true
        const response = await useFetchApi().post(`/articles/${id}?_method=PUT`, payload)
        this.getArticles()
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