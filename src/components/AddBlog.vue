<template>
	<div id="add-blog">
		<h1 class="showtit">添加博客</h1>
		<hr >
		<form v-if="!submited">
			<label>博客标题</label>
			<input type="text" name="" id="" value=""  v-model="blog.title" required=""/>
			<label>博客内容</label>
			<mavon-editor v-model='blog.preview' :ishljs="true" @change='updateDoc'></mavon-editor>	
			<div id="checkboxes">
				<label for="Vue.js">Vue.js</label>
				<input type="checkbox" name="" id="Vue.js" value="Vue.js" v-model="blog.categories"/>
				<label for="Node.js">Node.js</label>
				<input type="checkbox" name="" id="Node.js" value="Node.js" v-model="blog.categories"/>
				<label for="React.js">React.js</label>
				<input type="checkbox" name="" id="React.js" value="React.js" v-model="blog.categories"/>
				<label for="Angular4">Angular4</label>
				<input type="checkbox" name="" id="Angular4" value="Angular4" v-model="blog.categories"/>
			</div>
			<label>作者：</label>
			<input type="text" name="" id="" value="" v-model="blog.author"/>
			<button class="add" type="button" v-on:click.prevent="post" >添加博客</button>
			
		</form>
		
		
		
		<div id="preview">
			<h2>博客预览</h2>
			<hr >
			<p>博客标题：{{blog.title}}</p>
			<p>作者：{{blog.author}}</p>
			<el-tag v-for="(item,index) in blog.categories" :key="index">{{item}}</el-tag>
			<hr class="ad" noshade color="#CCCCCC">
			<p v-html="blog.content"></p>
			
			
			
		</div>
	</div>
</template>

<script>
	
	export default{
		name:'add-blog',
		data(){
			return {
				blog:{
					title:"",
					content:"",
					categories:[],
					author:"",
					preview:"",
					time:""
				},
				submited:false,
				
			}
		},
		methods:{
			post(){
				this.blog.time=this.getNowFormatDate()
				this.$axios.post("https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
				this.blog)
				.then((res)=>{
					console.log(res);
					this.submited=true;
					this.$Message['success']({
						background: true,
						content: '发布成功'
					});
				})
			},
			updateDoc(value, render) {
				this.blog.content = render;
			}
		}
	}
</script>

<style scoped>
	#add-blog *{
		box-sizing: border-box;
	}
	
	#add-blog{
		margin: 20px auto;
		max-width: 80%;
		padding: 20px;
	}
	
	label{
		display: block;
		margin-top: 20px;
	}
	
	input[type="text"],textarea{
		display: block;
		width: 100%;
		padding: 8px;
	}
	
	input[type="checkbox"]{
		
		width: 20px;
		margin-right: 50px;
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
	
	.add{
		margin-top: 10px;
		font-size: 18px;
		width: auto;
		padding: 10px;
		height: auto;
		border-radius: 15px;
		
	}
	
	#preview{
		padding: 10px 20px;
		border: 1px dotted #ccc;
		margin: 30px 0;
	}
	
	h2{
		margin-top: 10px;
	}
	.ad{
		margin: 5px 0;
	}
	
	
</style>
