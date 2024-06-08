<script setup>

    import { ref, onMounted, reactive, computed } from 'vue';
    import axios from 'axios';
    import { base_url } from '../../../util';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import '@bhplugin/vue3-datatable/dist/style.css';

    import { useArticleStore } from '../../../store/article';

    import { useRouter } from "vue-router";
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    import Modal from '../../../components/Modal.vue'

    const config ={
      position: 'top-right',
      dismissible: true,
      duration: 2000,
    }
    const toast = useToast(config);
    const router = useRouter()

    const articleStore = useArticleStore()

    const loading    = computed(() => articleStore.loading);
    const total_rows = ref(0);
    const isOpen     = ref(false);

    const params     = reactive({ current_page: 1, pagesize: 10 });
    const rows       = computed(() => articleStore.articles);

    const cols =
      ref([
          { field: 'category.name', title: 'Category'},
          { field: 'title', title: 'Judul'},
          { field: 'image_url', title: 'Cover'},
          { field: 'actions', title: 'Actions' },
    ]) || [];

    onMounted(() => {
      articleStore.getArticles();
    })

    const changeServer = (data) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;

        getData();
    };

    const handleDetail = (param) => {
        alert('View User');
    };
    const handleDelete = async (param) => {
        try {
          const response = await articleStore.deleteArticle(param)
          toast.success(response.message)
        } catch (error) {
          toast.error(error.message)
        }
    };

    const handleModal = () => {
        isOpen.value = !isOpen.value
    };
  
</script>

<template>
  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Daftar Artikel</h1>
      <div>
        <router-link to="/admin/article/create" class="bg-[#1f1f1f] text-white px-4 py-2 rounded-lg hover:bg-[#4d4d4d] transition-all duration-300 shadow-md">Tambah Artikel</router-link>
      </div>
      <!-- <router-link to="/admin/article/create" class="text-white bg-teal-500 px-8 py-2 rounded-lg flex items-center mr-6"> <vue-feather type="plus"></vue-feather> Tambah data</router-link> -->
    </div>
    <div>
      <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :totalRows="total_rows" :pageSize="params.pagesize" :sortable="true" :columnFilter="true" @change="changeServer">
          <template #id="data">
              <strong>#{{ data.value.id }}</strong>
          </template>
          <template #image_url="data">
                <div class="flex items-center gap-2">
                    <img :src="data.value.image_url" class="w-40 rounded-2xl"/>
                </div>
            </template>
          <template #actions="data">
              <div class="flex">
                  <router-link :to="`/admin/article/edit/${data.value.id}`" type="button" class="btn-success" > <vue-feather type="edit" size="14" class="mr-2" />  Edit</router-link>
                  <button type="button" class="btn-danger" @click="handleDelete(data.value.id)"> <vue-feather type="trash" size="14" class="mr-2" />  Delete</button>
              </div>
          </template>
      </vue3-datatable>
    </div>

    <!-- modal -->
    <Modal :isOpen="isOpen" @close="handleModal" :isFull="true">
      <div>

      </div>
    </Modal>
  </div>
  
</template>