<script setup>
  import { ref, onMounted, computed, reactive } from 'vue';
  
  import 'md-editor-v3/lib/style.css';
  import 'vue-toast-notification/dist/theme-sugar.css';

  import {useToast} from 'vue-toast-notification';
  import { useRoute, useRouter } from 'vue-router';
  import { MdEditor } from 'md-editor-v3';
  import { useCategoryStore } from '../../../store/category';
  import { useArticleStore } from '../../../store/article';
  import Input from '../../../components/Input.vue';
  import Loading from '../../../components/Loading.vue';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }

  const toast   = useToast(config);
  const router  = useRouter()
  const route   = useRoute();

  const categoryStore = useCategoryStore();
  const articleStore  = useArticleStore();

  const categories = computed(() => categoryStore.categories);
  const errors     = computed(() => articleStore.errors);
  const article    = computed(() => articleStore.article);
  const laoding = computed(() => articleStore.loading);

  const initState = {
    "category_id": '',
    "title": '',
    "content": '',
  }

  const data  = reactive({...initState}) 
  const image = ref('')
  
  const handleImage = (event) => {
    image.value = event.target.files[0]
  }

  // console.log(article.value);

  onMounted( async () => {
    await categoryStore.getCategories();
    await articleStore.getArticleById(route.params.id);

    data.category_id = article.value.category_id
    data.title = article.value.title
    data.content = article.value.content
  });

  const handleSubmit = async () => {
    let formData = new FormData()

    formData.append('category_id', data.category_id)
    formData.append('title', data.title)
    formData.append('image_cover', image.value)
    formData.append('content', data.content)

    try {
      const response = await articleStore.updateArticle(route.params.id, formData)
      toast.success(response.message)
      router.push('/admin/article')
    } catch (error) {
      typeof(error.message) !== 'object' ?
      toast.error(error.message) : toast.error(JSON.stringify(error.message));
    }
  };

 function handleBack(){
    articleStore.article = {}
    router.push('/admin/article')
  }

</script>

<template>

  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Buat Artikel</h1>
      <button @click="handleBack" class="btn-primary"> <vue-feather type="arrow-left"></vue-feather> kembali</button>
    </div>
    <div>

      <div class="mb-6">
        <label for="" class="text-gray-500 text-sm">Category</label>
        <div class="mt-1">
          <select :class="{ 'border-red-300': errors?.category_id }" name="category_id" id="" class="w-full border-2 border-gray-300 rounded-lg p-2 bg-white" v-model="data.category_id">
            <option v-for="(item, index) in categories" :key="index" class="text-gray-500" :value="item.id">{{ item.name }}</option>
          </select>
          <div v-if="errors?.category_id">
            <span class="text-red-500 text-sm mt-1">{{ errors?.category_id[0] }}</span>
          </div>
        </div>
      </div>

      <Input v-model="data.title" :error="errors?.title" title="Judul" />

      <div class="mb-6">
        <label for="" class="text-gray-500 text-sm">Gambar</label>
        <img class="w-36" :src=" image ?? ''" alt="">
        <div class="mt-1">
          <input :class="{ 'border-red-300': errors?.image_cover }" type="file" @change="handleImage($event)" class="w-full border-2 border-gray-300 rounded-lg p-2">
        </div>
        <div v-if="errors?.image_cover">
          <span class="text-red-500 text-sm mt-1">{{ errors?.image_cover[0] }}</span>
        </div>
      </div>
      <div class="mb-12">
        <label for="" class="text-gray-500">Gambar</label>
        <div :class="{ 'border-red-300 border-2 rounded-lg': errors?.content }" class="mt-3">
          <MdEditor language="en-US" v-model="data.content" />
          <!-- <QuillEditor v-model:content="content" content-type="html" theme="snow" class="w-full h-60 border-1 border-gray-500"/> -->
        </div>
        <div v-if="errors?.content">
          <span class="text-red-500 text-sm mt-3">{{ errors?.content[0] }}</span>
        </div>
      </div>

      <div>
        <button @click="handleSubmit" class="btn-primary">Simpan</button>
      </div>

    </div>
    <Loading v-if="laoding" />
  </div>
</template>