<script setup>
  import { computed, onMounted, ref } from "vue";
  import CardItem from "../../components/CardItem.vue";
  import { useHomeStore } from "../../store/home";
  import Loading from "../../components/Loading.vue";

  const homeStore = useHomeStore();
  const articles = computed(() => homeStore.articles);
  const laoding   = computed(() => homeStore.loading);

  const categories = computed(() => homeStore.categories);

  onMounted(() => {
    homeStore.getArticles(10);
    homeStore.getCategories();
  });

</script>

<template>
  <section class="bg-slate-100">
    <div>
      <div class="container py-8">
        <div class="w-full bg-white rounded-lg p-4 shadow-lg">
          <p class="text-slate-600 font-semibold">Artikel /</p>
        </div>
      </div>
    </div>
    <div class="container flex flex-col lg:flex-row ">
      <div class="pb-16">
        <div class="grid md:grid-cols-2 gap-6 mb-16">
          <CardItem v-for="item in articles" :key="item.id" :item="item"/>
        </div>
        <div class="text-center">
          <button class="text-sm text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-600 transition-all duration-200">load more</button>
        </div>
      </div>
      <div class="min-w-[300px] relative">
        <div class="px-4 sticky top-20">
          <div class="bg-white rounded-xl shadow-lg">
            <div class="py-4 px-4  border-b-2 border-slate-300">
              <p class="text-slate-700 text-semibold">Kategori</p>
            </div>
            <div class="divide-y-2 divide-gray-200">
              <router-link to="/" v-for="item in categories" :key="item.id">
                <div class="py-4 px-4 hover:bg-slate-900 hover:text-gray-50 transition-all duration-200 hover:rounded-lg">
                  <p class="text-slate-500 text-medium">{{ item.name }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="laoding" />
  </section>
</template>