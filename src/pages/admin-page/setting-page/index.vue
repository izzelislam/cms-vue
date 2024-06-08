<script setup>
  import { computed, onMounted, reactive } from 'vue'
  import card from "../../../components/card.vue"
  import Input from '../../../components/Input.vue';

  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '../../../store/user';
  import Loading from '../../../components/Loading.vue';
import { useAuthStore } from '../../../store/auth';
import { useCredentialStore } from '../../../store/credential';

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
  const authStore = useAuthStore();
  const toast     = useToast(config);
  const router    = useRouter();
  const credentialStore = useCredentialStore();
  
  const data   = reactive({...initState});
  const errors = computed(() => userStore.errors);
  const user   = computed(() => authStore.me);
  const loading = computed(() => authStore.loading); 

  onMounted( async () => {
    await authStore.getMe();
    Object.assign(data, {...user.value})
  })

  const handleSubmit = async () => {
    try {
      const response = await userStore.updateUser( data.id, data)
      toast.success(response.message)
      credentialStore.user = response.data
      authStore.me = response.data
      userStore.errors  = {}
    } catch (error) {
      typeof(error.message) !== 'object' ??
      toast.error(error.data.message)
    }
  };

</script>

<template>
  <card title="Setting">
    
    <Input title="Name" :error="errors?.name" v-model="data.name" />
    <Input title="Email" :error="errors?.email" v-model="data.email" />
    <Input title="Password" :error="errors?.password" v-model="data.password" type="password"/>

    <div>
      <button @click="handleSubmit" class="btn-primary">Simpan</button>
    </div>

    <Loading v-if="loading" />

  </card>
</template>
