<script setup>
  import { computed, onMounted, reactive } from 'vue'
  import card from "../../../components/card.vue"
  import Input from '../../../components/Input.vue';

  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '../../../store/user';
  import Loading from '../../../components/Loading.vue';

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
  const route     = useRoute();


  const data   = reactive({...initState});
  const errors = computed(() => userStore.errors);
  const user   = computed(() => userStore.user);
  const loading = computed(() => userStore.loading); 

  onMounted( async () => {
    await userStore.findUser( route.params.id );
    Object.assign(data, {...user.value})
  })

  const handleSubmit = async () => {
    try {
      const response = await userStore.updateUser( route.params.id, data)
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
  <card title="Update User" back="/admin/user">
    
    <Input title="Name" :error="errors?.name" v-model="data.name" />
    <Input title="Email" :error="errors?.email" v-model="data.email" />
    <Input title="Password" :error="errors?.password" v-model="data.password" type="password"/>

    <div>
      <button @click="handleSubmit" class="btn-primary">Simpan</button>
    </div>

    <Loading v-if="loading" />

  </card>
</template>
