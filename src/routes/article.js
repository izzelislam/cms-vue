import ListArticle from '../pages/admin-page/article-page/list.vue'
import CreateArticle from '../pages/admin-page/article-page/create.vue'
import DetailArticle from '../pages/admin-page/article-page/detail.vue'

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
      path: 'update/:id',
      name: 'article-update',
      component: DetailArticle
    }
  ]
}
export default articleRoute