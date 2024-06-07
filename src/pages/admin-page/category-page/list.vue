<template>
  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Daftar Category</h1>
      <router-link to="/admin/category/create" class="text-white bg-teal-500 px-8 py-2 rounded-lg flex items-center mr-6"> <vue-feather type="plus"></vue-feather> Tambah data</router-link>
    </div>
    <div>
      <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :totalRows="total_rows" :pageSize="params.pagesize" :sortable="true" :columnFilter="true" @change="changeServer">
          <template #id="data">
              <strong>#{{ data.value.id }}</strong>
          </template>
          <template #actions="data">
              <div class="flex gap-4">
                  <button type="button" class="px-4 py-2 bg-green-500 rounded-lg text-white flex items-center" @click="handleDetail(data.value)"> <vue-feather type="eye" size="14" /> &nbsp; View</button>
                  <button type="button" class="px-4 py-2 bg-red-500 rounded-lg text-white flex items-center" @click="handleDelete(data.value.id)"> <vue-feather type="trash" size="14" /> &nbsp; Delete</button>
              </div>
          </template>
      </vue3-datatable>
    </div>
  </div>
  
</template>

<script setup>

    import { ref, onMounted, reactive } from 'vue';
    import axios from 'axios';
    import { base_url } from '../../../util';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import '@bhplugin/vue3-datatable/dist/style.css';

    import { useRouter } from "vue-router";
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }
  const toast = useToast(config);
  const router = useRouter()

    onMounted(() => {
      getData();
    });

    const loading = ref(true);
    const total_rows = ref(0);

    const params = reactive({ current_page: 1, pagesize: 10 });
    const rows = ref(null);

    const cols =
        ref([
            { field: 'name', title: 'name'},
            { field: 'actions', title: 'Actions' },
        ]) || [];

    const getData = async () => {
        try {
            loading.value = true;

            const response = await axios.get(`${base_url}/categories`,{
              headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
              }
            })

            rows.value = response.data.data ?? [];
            total_rows.value = response.data.data.length ?? 0;
        } catch(error) {

          if (error.response.status == 401) {
            toast.error(error.response.data.message);
            localStorage.removeItem('token');
            router.push('/login');
          }

          toast.error(error.response.data.message);
        }

        loading.value = false;
    };
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
          
          let response = await axios.delete(`${base_url}/categories/${param}`,{
            headers: {
              'Authorization': `bearer ${localStorage.getItem('token')}`
            }
          })

          if (response.status == 200) {
            toast.success(response.data.message);
            getData();
          }

        } catch (error) {
          if (error.response.status == 401) {
            toast.error(error.response.data.message);
            localStorage.removeItem('token');
            router.push('/login');
          }

          toast.error(error.response.data.message);
        }
    };
  
</script>