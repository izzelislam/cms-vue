<template>
  
  <section class="bg-gradient-to-r from-[#8cb055] via-[#151515] to-[#208ae0] py-16">
    <div class="container flex flex-col items-center justify-center">
      <div class="text-center mb-8">
        
        <AutoTyperVue
          class="text-4xl font-semibold text-slate-100"
          componentTag="h1"
          :text="['Belajar Koding Jadi Makin Seru', 'Dengan belajar yang terstruktur', 'Mulai dari dasar hingga menjadi Mahir']"
          :repeat="true"
        />

        <!-- <p class="text-4xl font-semibold text-slate-100"></p><br> -->
        <p class="text-md text-gray-200 mt-4">Belajar pemrograman lengkap dan terstruktur</p>
      </div>
      <div class="w-2/3">
        <input type="text" class="w-full border-2 border-gray-300 px-4 py-2 rounded-lg outline-none focus:outline-none" placeholder="Cari sesuatu...">
      </div>
      <!-- <div class="">
        <h1 class="text-4xl font-bold text-teal-500">Around the word just in hand</h1>
        <h6 class="text-lg font-normal text-gray-500 my-6">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h6>
        <div>
          <button class="text-lg text-white bg-teal-500 px-8 py-2 rounded-lg">latest news</button>
        </div>
      </div>
      <div class="hidden md:block">
        <div class="w-1/2 m-auto">
          <img class="rounded-lg" src="https://newinti.edu.my/wp-content/uploads/2021/02/information-system.jpg" alt="">
        </div>
      </div> -->
    </div>

  </section>

  <section class="pb-8 pt-16 bg-gray-100">
    <div class="text-center mb-4">
      <p class="text-lg font-semibold text-slate-700">Silahkan Pilih Roadmap Kamu</p>
      <p class="text-sm font-medium text-slate-500">menjadi expret yang handal dengan belajar yan terstruktur dan sistematis</p>
    </div>
    <div class="container flex flex-wrap gap-2 justify-center">
      <div v-for="item in langs" :key="item" class="w-[100px] h-[100px] bg-white rounded-lg flex flex-col items-center justify-center">
        <img class="w-1/2" :src="item" alt="">
      </div>
    </div>
  </section>

  <section class="bg-gray-100 py-8">
    <div class="container relative">
      <div class="bg-white border-b-2 mb-4 p-4 flex justify-between align-middle rounded-lg sticky top-20">
        <h1 class="text-lg font-medium text-slate-700">Artikel Terbaru</h1>
        <router-link to="/" class="text-sm font-medium text-white bg-slate-900 rounded-full px-2 py-1">
          lihat semua
        </router-link>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <CardItem v-for="item in articles" :key="item" :item="item"/>
      </div>
    </div>
  </section>

  <section class="py-8 bg-gray-100">
    <div class="container">
      <div class="bg-gradient-to-r from-[#8cb055] via-[#151515] to-[#208ae0] min-h-[300px] w-full rounded-lg text-center flex flex-col justify-center align-middle">
        <h2 class="text-3xl font-bold text-white self-center">Tunggu Apalagi Mulai Sekarang !</h2>
        <div>
          <button class="text-white border-2 border-white rounded-lg px-4 py-3 mt-4 hover:text-slate-900 hover:bg-white transition-all duration-300">Jelajahi Semua</button>
        </div>
      </div>
    </div> 
    
    <Loading v-if="loading" />
  </section>

</template>

<style scoped>
@import "auto-typer-vue3/dist/style.css";
</style>

<script setup>

  import { computed, onMounted, ref } from "vue"
  import CustomButton from "../../components/CustomButton.vue";
  import CardItem from "../../components/CardItem.vue";

  import { AutoTyperVue } from "auto-typer-vue3";
  import { useHomeStore } from "../../store/home";
  import Loading from "../../components/Loading.vue";

  const homeStore = useHomeStore();

  const articles = computed(() => homeStore.articles);
  const loading   = computed(() => homeStore.loading);

  onMounted(() => {
    homeStore.getArticles();
  })

  let text = [
    'This is a demo.',
    'And this is another Demo!'
  ];

  const langs = ref([
    "/logo-lang/html.png",
    "/logo-lang/css.png",
    "/logo-lang/bootstrap.png",
    "/logo-lang/tailwind.png",
    "/logo-lang/js.png",
    "/logo-lang/php.png",
    "/logo-lang/laravel.png",
    "/logo-lang/express.png",
    "/logo-lang/go.png",
    "/logo-lang/react.png",
    "/logo-lang/next.png",
    "/logo-lang/vue.png",
    "/logo-lang/nuxt.png",
    "/logo-lang/flutter.png",
    "/logo-lang/docker.png",
    "/logo-lang/nginx.png",
  ]);

  const list = ref([
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
    'Dumy title news',
  ]);

</script>