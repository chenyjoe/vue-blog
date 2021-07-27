
import ShowBlogs from './components/ShowBlogs.vue';
import AddBlog from './components/AddBlog.vue';
import DetailBlog from './components/DetailBlog.vue';
import EditBlog from './components/EditBlog.vue';
import Search from './components/Search.vue';

export default [
	{
		path:"/",
		component:ShowBlogs
	},
	{
		path:"/add",
		component:AddBlog
	},
	{
		path:"/blog/:id",
		component:DetailBlog
	},
	{
		path:"/edit/:id",
		component:EditBlog
	},
	{
		path:"/search",
		component:Search
	}
]
