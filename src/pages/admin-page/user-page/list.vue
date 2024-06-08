<template>
  <card title="Daftar User" url="/admin/user/create">
    <vue3-datatable :rows="users" :columns="cols" :loading="loading" :totalRows="users.length" :pageSize="params.pagesize" :sortable="true" :columnFilter="true" @change="changeServer">
        <template #id="data">
            <strong>#{{ data.value.id }}</strong>
        </template>
        <template #actions="data">
            <div class="flex">
                <router-link :to="`/admin/user/edit/${data.value.id}`" class="btn-success"> <vue-feather type="edit" size="14" /> &nbsp; edit</router-link>
                <button type="button" class="btn-danger" @click="handleDelete(data.value.id)"> <vue-feather type="trash" size="14" /> &nbsp; Delete</button>
            </div>
        </template>
    </vue3-datatable>
  </card>
</template>

<script setup>
  import { ref, onMounted, reactive, computed } from 'vue';
  import card from "../../../components/card.vue"
  import axios from 'axios';
  import { base_url } from '../../../util';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import '@bhplugin/vue3-datatable/dist/style.css';

  import { useRouter } from "vue-router";
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useUserStore } from '../../../store/user';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }
  const toast     = useToast(config);
  const router    = useRouter()
  const userStore = useUserStore();

  const users   = computed(() => userStore.users);
  const loading = computed(() => userStore.loading);
  const params  = reactive({ current_page: 1, pagesize: 10 });

  const cols =
  ref([
      { field: 'name', title: 'Nama'},
      { field: 'email', title: 'Email'},
      { field: 'actions', title: 'Actions' },
  ]) || [];

  onMounted(() => {
    userStore.getUsers();
  });

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
        
        let response = await axios.delete(`${base_url}/articles/${param}`,{
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