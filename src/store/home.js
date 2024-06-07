import { defineStore } from "pinia";
import { useFetchApi } from "../composable/usefetchApi";
import axios from "axios";

export const useHomeStore = defineStore("home", {
  state: () => ({
    loading : false,
    articles : [],
    article  : {},
    categories : [],
    currentPage : 1,
    totalPage  : 0
  }),
  actions: {
    async getArticles(paging = 9) {
      try {
        this.loading = true
        const response = await useFetchApi().get(`/home/get-articles?paging=${paging}`)
        this.articles = response.data.data
        // console.log(response.data.last_page);
        this.totalPage = response.data.last_page
        this.loading = false
      } catch (error) {
      }
    },
    async getArticleById(id){
      try {
        this.loading = true
        const response = await useFetchApi().get(`/home/find-articles/${id}`)
        this.article = response.data
        this.loading = false
      } catch (error) {
      }
    },
    async getCategories(){
      try {
        this.loading = true
        const response = await useFetchApi().get(`/home/get-category`)
        this.categories = response.data
        this.loading = false
      } catch (error) {
      }
    },
    async loadMoreArticles(paging){
      try {
        this.loading = true
        this.currentPage++
        const  response = await useFetchApi().get(`/home/get-articles?page=${this.currentPage}&paging=${paging}`)
        this.articles = [...this.articles, ...response.data.data]
        // console.log(response.data);
        this.loading = false
      } catch (error) {
      }
    }
  }
})