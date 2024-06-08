<template>
  <div v-if="alert" class="w-full px-5 py-3 bg-teal-500 text-white rounded-2xl mb-6 flex justify-between">
    <p>Data berhasil disimpan</p>
    <div @click="toogleAlert" class="cursor-pointer">
      <vue-feather type="x"></vue-feather>
    </div>
  </div>

  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Daftar Category</h1>
      <router-link to="/admin/category" :class="defaulButtonStyle"> <vue-feather type="arrow-left"></vue-feather> kembali</router-link>
    </div>
    <div>

      <div class="mb-6">
        <label for="" class="text-gray-500">Name</label>
        <div class="mt-3">
          <Input v-model="data.name" :error="errors?.name" />
        </div>
      </div>

      <div>
        <button @click="handleSubmit" :class="defaulButtonStyle">Simpan</button>
      </div>

    </div>
  </div>
</template>

<script setup>
  import {computed, reactive, ref, watch} from "vue"
  import { defaulButtonStyle } from "../../../util";
  import { useRouter } from "vue-router";
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { useCategoryStore } from "../../../store/category";
  import Input from "../../../components/Input.vue";


  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }

  const categoryStore = useCategoryStore();
  const errors = computed(() => categoryStore.errors);
  const success = computed(() => categoryStore.success);

  const toast = useToast(config);
  const router = useRouter()

  const initState = {
    name: ''
  }

  const alert = ref(false)
  const data = reactive({...initState})

  const  toogleAlert = () => {
    alert.value = !alert.value
  }

  const handleSubmit = async () => {
    try {
      await categoryStore.storeCategory(data)
      toast.success(success.value);
      categoryStore.errors  = {}
      categoryStore.error   = ''
      categoryStore.success =''
      router.push('/admin/category')
    } catch (error) {
      typeof(error.data.message) !== 'object' ??
      toast.error(error.data.message );
    }
  };



</script>