<script setup>
  import { computed, reactive } from 'vue'
  import card from "../../../components/card.vue"
  import Input from '../../../components/Input.vue';

  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../../../store/user';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }

  const initState = {
    name: '',
    email: '',
    password: '',
  };

  const userStore = useUserStore();
  const toast     = useToast(config);
  const router    = useRouter();


  const data   = reactive({...initState});
  const errors = computed(() => userStore.errors);

  const handleSubmit = async () => {
    try {
      const response = await userStore.storeUser(data)
      toast.success(response.message)
      userStore.errors  = {}
      router.push('/admin/user')
    } catch (error) {
      typeof(error.message) !== 'object' ??
      toast.error(error.data.message)
    }
  };

</script>

<template>
  <card title="Buat User" back="/admin/user">
    
    <Input title="Name" :error="errors?.name" v-model="data.name" />
    <Input title="Email" :error="errors?.email" v-model="data.email" />
    <Input title="Password" :error="errors?.password" v-model="data.password" type="password"/>

    <div>
      <button @click="handleSubmit" class="btn-primary">Simpan</button>
    </div>
  </card>
</template>
