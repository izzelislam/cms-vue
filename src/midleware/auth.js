import { useCredentialStore } from "../store/credential";



const auth  = (to, from, next) => {

  const credentialStore = useCredentialStore();

  if (credentialStore.token) {
    console.log("auth ok");
    next()
  }else {
    console.log("auth reject");
    next('/login')
  }
}

const gues = (to, from, next) => {
  const credentialStore = useCredentialStore();
  
  if (credentialStore.token) {
    console.log("guest ok");
    next('/admin/dashboard')
  }else {
    console.log("guest reject");
    next()
  }
}

export { auth, gues }