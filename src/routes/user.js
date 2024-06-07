import ListUser from '../pages/admin-page/user-page/list.vue'
import DetailUser from '../pages/admin-page/user-page/detail.vue'
import CreateUser from '../pages/admin-page/user-page/create.vue'

const userRoute = {
  path: 'user',
  name: 'user',
  children: [
    {
      path: '',
      name: 'user-add',
      component: ListUser
    },
    {
      path: 'create',
      name: 'user-create',
      component: CreateUser
    },
    {
      path: 'update/:id',
      name: 'user-update',
      component: DetailUser
    }
  ]
}

export default userRoute