const auth  = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
  }else {
    next('/login')
  }
}

const gues = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next('/admin/dashboard')
  }else {
    next()
  }
}

export { auth, gues }