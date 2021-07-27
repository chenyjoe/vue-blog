<template>
	<div id="edit-blog">
		<h1 class="showtit">编辑博客</h1>
		<hr >
		<form v-if="!submited">
			<label>博客标题</label>
			<input type="text" name="" id="" value=""  v-model="blog.title" required=""/>
			<label>博客内容</label>
			<mavon-editor v-model='blog.preview' :ishljs="true" @change='updateDoc'></mavon-editor>	
			<div id="checkboxes">
				<label>Vue.js</label>
				<input type="checkbox" name="" id="" value="Vue.js" v-model="blog.categories"/>
				<label>Node.js</label>
				<input type="checkbox" name="" id="" value="Node.js" v-model="blog.categories"/>
				<label>React.js</label>
				<input type="checkbox" name="" id="" value="React.js" v-model="blog.categories"/>
				<label>Angular4</label>
				<input type="checkbox" name="" id="" value="Angular4" v-model="blog.categories"/>
			</div>
			<label>作者：</label>
			<input type="text" name="" id="" value="" v-model="blog.author"/>
			<button class="editbt" type="button" v-on:click.prevent="put" >编辑博客</button>
			
		</form>
		
		<div v-if="submited">
			<h3>发布成功</h3>
		</div>
		
		<div id="preview">
			<h2>博客预览</h2>
			<hr >
			<p>博客标题：{{blog.title}}</p>
			<p>作者：{{blog.author}}</p>
			<el-tag v-for="(item,index) in blog.categories" :key="index">{{item}}</el-tag>
			<hr class="bj" noshade color="#CCCCCC">
			<p v-html="blog.content"></p>
			
			
		</div>
	</div>
</template>

<script>
	export default{
		name:'edit-blog',
		data(){
			return {
				id:this.$route.params.id,
				blog:{},
				submited:false,
				
			}
		},
		methods:{
			fetchData(){
				this.$axios.get('https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts/'+this.id+'.json')
					.then((res)=>{
						this.blog=res.data
						this.preview=this.blog.content
					})
			},
			put(){
				this.blog.time=this.getNowFormatDate()
				this.$axios.put('https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts/'+this.id+'.json',
				this.blog)
				.then((res)=>{
					console.log(res);
					this.submited=true;
				})
			},
			updateDoc(value, render) {
				this.blog.content = render;
			}
		},
		created() {
			this.fetchData()
			
		}
	}
</script>

<style scoped>
	#edit-blog *{
		box-sizing: border-box;
	}
	
	#edit-blog{
		margin: 20px auto;
		max-width: 80%;
		padding: 20px;
	}
	
	label{
		display: block;
		margin: 20px 0 10px;
	}
	
	input[type="text"],textarea{
		display: block;
		width: 100%;
		padding: 8px;
	}
	input[type="checkbox"]{
		
		width: 20px;
		margin-right: 40px;
		margin-top: 20px;
	}
	
	textarea{
		height: 200px;
	}
	
	#checkboxes label{
		display: inline-block;
		margin-top: 0;
	}
	
	#checkboxes input{
		display: inline-block;
		margin-left: 10px;
	}
	
	button{
		display: block;
		margin: 20px 0;
		background: crimson;
		color: #fff;
		border: 0;
		padding: 14px;
		border-radius: 4px;
		font-size: 18px;
		cursor: pointer ;
	}
	
	#preview{
		padding: 10px 20px;
		border: 1px dotted #ccc;
		margin: 30px 0;
	}
	
	h2{
		margin-top: 10px;
	}
	
	.editbt{
		margin-top: 10px;
		font-size: 18px;
		width: auto;
		padding: 10px;
		height: auto;
		border-radius: 15px;
	}
	.bj{
		margin: 5px 0;
	}
</style>
