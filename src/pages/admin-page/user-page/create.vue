<script setup>
  import { ref } from 'vue'
  import card from "../../../components/card.vue"
  import Input from '../../../components/Input.vue';

  import axios from 'axios';
  import { base_url } from '../../../util';
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useRouter } from 'vue-router';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }
  const toast = useToast(config);
  const router = useRouter();

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const errors   = ref([]);

  const handleSubmit = async () => {
    console.log(name.value, email.value, password.value)
    try {
      const response = await axios.post(`${base_url}/users`, {
        name: name.value,
        email: email.value,
        password: password.value
      }, {
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status == 201){
        toast.success(response.data.message);
        router.push('/admin/user')
      }

    } catch (error) {
      if (error.response.status == 422) {
        errors.value = error.response.data.data
      }
    }
  }

</script>

<template>
  <card title="Buat User" back="/admin/user">
    
    <FormInput title="Name" :error="errors.name" v-model="name" />
    <FormInput title="Email" :error="errors.email" v-model="email" />
    <FormInput title="Password" :error="errors.password" v-model="password" type="password"/>

    <div>
      <button @click="handleSubmit" class="text-white bg-teal-500 px-8 py-2 rounded-lg">Simpan</button>
    </div>
  </card>
</template>
