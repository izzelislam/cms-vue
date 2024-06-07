import ListCategory from '../pages/admin-page/category-page/list.vue'
import CreateCategory from '../pages/admin-page/category-page/create.vue'
import EditCategory from '../pages/admin-page/category-page/edit.vue'

const categoryRoute ={
  path: 'category',
  name: 'category',
  children: [
    {
      path: '',
      name: 'category-add',
      component: ListCategory
    },
    {
      path: 'create',
      name: 'category-create',
      component: CreateCategory
    },
    {
      path: 'update/:id',
      name: 'category-update',
      component: EditCategory
    }
  ]
}

export default categoryRoute