import { defineStore } from "pinia"
import { useFetchApi } from "../composable/usefetchApi"
import { useCredentialStore } from "./credential"
import { ref } from "vue";
import { useRouter } from "vue-router";


export const useAuthStore = defineStore("auth", () => {
    
    const loading = ref(false)
    const errors = ref([])
    const error = ref('')
    const me = ref({})

    const router = useRouter()

    const credentialStore  = useCredentialStore()

    async function login(payload) {
      try {
        const credentialStore = useCredentialStore();

        this.loading = true
        const response = await useFetchApi().post("/login", payload)
        
        credentialStore.token = response.data.token
        credentialStore.user = response.data.user

        useFetchApi().defaults.headers.common['Authorization'] = `Bearer ${credentialStore.token}`

        this.loading = false
      } catch (error) {
        this.loading = false
        let code = error.data.status
        if (code == 422) {
          this.errors = error.data.message
        }else{
          this.error = error.data.message
        }
      }
    }

    async function getMe() {
      try {
        this.loading = true
        const response = await useFetchApi().get("/me")
        this.me = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = error.data.message
        if (error.data.status == 401) {
          const authStore = useAuthStore()
          authStore.logout()
          this.$router.push('/login');
        }
      }
    }

    async function logout() {
      try {
        this.loading = true
        const response = await useFetchApi().post("/logout")
        
        credentialStore.token = null
        credentialStore.user = null

        router.push('/login')
        
        this.loading = false
      } catch (error) {
        this.loading = false
        credentialStore.token = null
        credentialStore.user = null
        router.push('/login')
      }
    }
  

    return {
      login,
      getMe,
      loading,
      errors,
      error,
      me,
      logout
    }

})