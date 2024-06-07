<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import CardList from "../../components/CardList.vue";
import Loading from "../../components/Loading.vue";
import { useHomeStore } from "../../store/home";
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

  const homeStore = useHomeStore();
  const route     = useRoute()

  const loading = computed(() => homeStore.loading);
  const article = computed(() => homeStore.article);
  const articles = computed(() => homeStore.articles);
  const categories = computed(() => homeStore.categories);


  const id = 'preview-only';
  
  onMounted(() => {
    homeStore.getArticleById( route.params.id );
    homeStore.getArticles(4);
    homeStore.getCategories();
  })

  const lang = ref('en')
  
  function newComment (e) {
    console.log(e)
  }
</script>

<template>
  <section class="bg-slate-100">
    <div>
      <div class="container py-8">
        <div class="w-full bg-white rounded-lg p-4 shadow-lg">
          <p class="text-slate-600 font-semibold">Artikel / {{ article.slug }}</p>
        </div>
      </div>
    </div>
    <div class="container grid grid-cols-1 lg:grid-cols-12 ">
      <div class="pb-16 md:col-span-9">
        <div>
          <div class=" bg-white p-8 rounded-lg mb-16">

            <h1 class="text-3xl text-slate-900 mb-6">{{ article.title }}</h1>
            <div>
              <img class="w-full rounded-lg" :src="article.image_url" :alt="article.slug">
            </div>
            
            <div class="p-4 flex justify-between mb-6">
              <div class="flex items-center">
                <div class="mr-3">
                  <img class="w-12 h-12 rounded-full object-cover" src="https://upload.wikimedia.org/wikipedia/id/thumb/d/d5/Aang_.jpg/300px-Aang_.jpg" alt="">
                </div>
                <div>
                  <div class="text-gray-500">toloc@mail.com</div>
                  <div class="text-xs text-gray-400">penulis</div>
                </div>
              </div>
                <div>
                  <span class="py-1 px-3 bg-amber-500 text-white rounded-lg text-xs block">Flutter</span>
                  <span class="py-1 px-3 text-gray-500 rounded-lg text-xs">12/jun/2024</span>
                </div>
            </div>
  
            <div class="text-slate-600 text-justify leading-7">
              <MdPreview :editorId="id" :modelValue="article.content" />
            </div>
          </div>

          <div class="bg-white p-8 rounded-lg">
            <div class="b-4">
              <p class="text-slate-700 text-lg">Komentar</p>
            </div>
            <div >
              <Disqus
                height="auto"
                :identifier="article.id"
                ref="disqus"
                :lang="lang"
                @new-comment="newComment"
              />
            </div>
          </div>

        </div>
      </div>
      <div class="min-w-[300px] relative md:col-span-3 pr-3.5 mb-10">
        <div class="px-4 sticky top-20">
          <div class="bg-white rounded-xl shadow-lg mb-8">
            <div class="py-4 px-4  border-b-2 border-slate-300">
              <p class="text-slate-700 text-semibold">Kategori</p>
            </div>
            <div class="divide-y-2 divide-gray-200">
              <router-link to="/" v-for="item in categories" :key="item">
                <div class="py-4 px-4 hover:bg-slate-900 hover:text-gray-50 transition-all duration-200 hover:rounded-lg">
                  <p class="text-slate-500 text-medium">{{ item.name }}</p>
                </div>
              </router-link>

            </div>
          </div>
          <div>
            <div class="py-4 px-4">
              <p class="text-slate-700 text-semibold">Artikel Terkait</p>
            </div>
            <div class="lg:max-w-[300px]">
              <CardList v-for="item in articles" :key="item" :item="item" class="mb-4" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Loading v-if="loading" />
  </section>
</template>