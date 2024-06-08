import ListUser from '../pages/admin-page/user-page/list.vue'
import Edit from '../pages/admin-page/user-page/edit.vue'
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
      path: 'edit/:id',
      name: 'edit-user',
      component: Edit
    }
  ]
}

export default userRoute