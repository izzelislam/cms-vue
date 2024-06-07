import ListComment from '../pages/admin-page/comment-page/list.vue'
import DetailComment from '../pages/admin-page/comment-page/detail.vue'
import CreateComment from '../pages/admin-page/comment-page/create.vue'
import EditComment from '../pages/admin-page/comment-page/edit.vue'


const commentRoute = {
  path: 'comment',
  name: 'comment',
  children: [
    {
      path: '',
      name: 'comment-add',
      component: ListComment
    },
    {
      path: 'create',
      name: 'comment-create',
      component: CreateComment
    },
    {
      path: 'update/:id',
      name: 'comment-edit',
      component: EditComment
    },
    {
      path: 'update/:id',
      name: 'comment-detail',
      component: DetailComment
    }
  ]
}

export default commentRoute