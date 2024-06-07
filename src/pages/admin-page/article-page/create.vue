<template>

  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Buat Artikel</h1>
      <router-link to="/admin/article" class="text-white bg-teal-500 px-8 py-2 rounded-lg flex items-center mr-6"> <vue-feather type="arrow-left"></vue-feather> kembali</router-link>
    </div>
    <div>

      <div class="mb-6">
        <label for="" class="text-gray-500">Category</label>
        <div class="mt-3">
          <select name="category_id" id="" class="w-full border-2 border-gray-300 rounded-lg p-2" v-model="categoryId">
            <option v-for="(item, index) in categories" :key="index" class="text-gray-500" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>

      <div class="mb-6">
        <label for="" class="text-gray-500">Judul</label>
        <div class="mt-3">
          <input v-model="title" type="text" class="w-full border-2 border-gray-300 rounded-lg p-2">
        </div>
      </div>

      <div class="mb-6">
        <label for="" class="text-gray-500">Gambar</label>
        <img class="w-36" :src=" image ?? ''" alt="">
        <div class="mt-3">
          <input type="file" @change="handleImage($event)" class="w-full border-2 border-gray-300 rounded-lg p-2">
        </div>
      </div>
      <div class="mb-12">
        <label for="" class="text-gray-500">Gambar</label>
        <div class="mt-3">
          <MdEditor language="en-US" v-model="content" />
          <!-- <QuillEditor v-model:content="content" content-type="html" theme="snow" class="w-full h-60 border-1 border-gray-500"/> -->
        </div>
      </div>

      <div>
        <button @click="handleSubmit" class="text-white bg-teal-500 px-8 py-2 rounded-lg">Simpan</button>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  import axios from 'axios';
  import { base_url } from '../../../util';
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRouter } from 'vue-router';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';


  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }
  const toast = useToast(config);
  const router = useRouter()

  const categories = ref([])

  const categoryId = ref('')
  const title = ref('')
  const image = ref('')
  const content = ref('')

  onMounted(() => {
    getCategories()
  })

  const getCategories = async () => {
    const response = await axios.get(`${base_url}/categories`,{
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    })

    categories.value = response.data.data
  }

  const handleImage = (event) => {
    image.value = event.target.files[0]
  }


  const handleSubmit = async () => {
    console.log(content.value);
    let formData = new FormData()

    formData.append('category_id', categoryId.value)
    formData.append('title', title.value)
    formData.append('image_cover', image.value)
    formData.append('content', content.value)

    try {
      let response = await axios.post(`${base_url}/articles`, formData, {
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        router.push('/admin/article')
      }

    } catch (error) {
      config.type = 'error'
      console.log(error.response.data);
      // toast.error(error.response.data.message);
    }
  }
</script>