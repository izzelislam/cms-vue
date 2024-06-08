<template>
  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Daftar Category</h1>
      <router-link to="/admin/category/create" class="btn-primary"> <vue-feather type="plus"></vue-feather> Tambah data</router-link>
    </div>
    <div>
      <vue3-datatable :rows="categories" :columns="cols" :loading="loading" :totalRows="categories.length" :pageSize="params.pagesize" :sortable="true" :columnFilter="true" @change="changeServer">
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

    import { ref, onMounted, reactive, computed, watch } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import '@bhplugin/vue3-datatable/dist/style.css';

    import 'vue-toast-notification/dist/theme-sugar.css';
    import { useCategoryStore } from '../../../store/category';
    import { configToast } from '../../../util';
    import {useToast} from 'vue-toast-notification';

    const categoryStore = useCategoryStore();
    const loading = computed(() => categoryStore.loading);
    const categories = computed(() => categoryStore.categories);
    const success    = computed(() => categoryStore.success);

    
    const toast = useToast(configToast);
    const params = reactive({ current_page: 1, pagesize: 10 });
    
    const cols = ref([
      { field: 'name', title: 'name'},
      { field: 'actions', title: 'Actions' },
    ]) || [];

    onMounted(() => {
      categoryStore.getCategories();
    });

    const changeServer = (data) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        categoryStore.getCategories();
    };

    const handleDetail = (param) => {
        alert('View User');
    };

    const handleDelete = async (param) => {
      try {
        await categoryStore.deleteCategories(param);
        toast.success(success.value);
      } catch (error) {
        toast.error(error.data.message ?? '');
      }
    };
  
</script>