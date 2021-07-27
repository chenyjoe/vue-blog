<template>
	<div id="detail-blog">
		<h1>{{blog.title}}</h1>
		<p class="tm">{{blog.time}}</p>
		<p>作者：{{blog.author}}</p>	
		<el-tag v-for="(item,index) in blog.categories" :key="index">{{item}}</el-tag>
		<hr class="cc" noshade color="azure">
		<article v-html="blog.content"></article>
		<div class="de">
		<button @click="modal2 = true">删除</button>
		<Modal v-model="modal2" width="400">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除确认</span>
			</p>
			<div style="text-align:center">
				<p>此博客删除后不能撤回。</p>
				<p>是否继续删除?</p>
			</div>
			<div slot="footer">
				<Button class="viewuibt" type="error" size="large" long :loading="modal_loading" @click="deleteBlog()">删除</Button>
			</div>
		</Modal>
		<router-link :to="'/edit/'+id"><button class="edit">编辑</button></router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name:'detail-blog',
		data(){
			return{
				modal2: false,
				modal_loading:false,
				id:this.$route.params.id,
				blog:{}
			}
		},
		created() {
			this.$axios.get('https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts/'+this.id+'.json')
			.then((res)=>{
				// console.log(res)
				this.blog=res.data
			})
		},
		methods:{
			deleteBlog(){
				this.modal_loading = true;
				setTimeout(() => {
					this.modal_loading = false;
					this.modal2 = false;
					this.$Message.success('删除成功');
				}, 1000);
				this.$axios.delete('https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts/'+this.id+'.json')
							.then(()=>{
							setTimeout(()=>{
								this.$router.push({path:'/'})
							},1000)
							})
			}
		}
	}
</script>

<style scoped="scoped">
	#detail-blog{
		max-width: 960px;
		margin: 0 auto;
		padding: 20px;
		background: #eee;
		border:1px dotted #aaa;
	}
	.cc{
		margin: 5px 0;
	}
	
	button{
		margin: 30px 20px 10px 20px;
	}
	.de{
		text-align: right;
	}
	.edit{
		background: #ffaa00;
	}
	.viewuibt{
		margin: 0;
	}
</style>
