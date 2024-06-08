import ListArticle from '../pages/admin-page/article-page/list.vue'
import CreateArticle from '../pages/admin-page/article-page/create.vue'
import EditArticle from '../pages/admin-page/article-page/edit.vue'

const articleRoute = {
  path: 'article',
  name: 'article',
  children: [
    {
      path: '',
      name: 'article-add',
      component: ListArticle
    },
    {
      path: 'create',
      name: 'article-create',
      component: CreateArticle
    },
    {
      path: 'edit/:id',
      name: 'article-edit',
      component: EditArticle
    }
  ]
}
export default articleRoute