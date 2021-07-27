<template>
	<div id="show-blogs">
		<h1 class="showtit">博客总览</h1>
		<hr >
		<input type="text" v-model="search" name="" id="" value="" placeholder="搜索"/>
		<DatePicker element-id="st" @on-change="st" @on-clear="cst" @on-ok="st"  type="date"  confirm placeholder="选择时间" style="width:200px;margin-left: 10px;"></DatePicker>
		<button class="ss" @click="sousuo">搜索</button>
		<div class="single-blog" v-for="(item,index) in dataShow" :key="index" >
			<router-link :to="'/blog/'+item.id">
			<h2 v-tit>{{item.title | toUppercase}}</h2>
			<p class="tm">{{item.time}}</p>
			<el-tag v-for="(item2,index2) in item.categories" :key="index+'-'+index2">{{item2}}</el-tag>
			<hr class="cc" color="azure" noshade="">
			<article v-html="$options.filters.snippet(item.content)"></article>
			</router-link>
		</div>
		<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="page">
		</el-pagination>
	</div>
</template>

<script>
	
	export default{
		name:'show-blogs',
		data(){
			return{
				
				selectTime:"",
				blogs:[],
				search:'',
				totalPage:[],
				pageSize:3,
				total:null,
				pageNum:1,
				crtPage:0,
				dataShow:[],
				filteredBlogs:[]
			}
		},
		methods:{
			page(currentPage){
				this.crtPage=currentPage-1
				this.dataShow=this.totalPage[this.crtPage]
			},
			sousuo(){
				var fb=[];
				if(this.selectTime!=''){
					for(let i=0;i<this.blogs.length;i++){
						if(this.blogs[i].time==this.selectTime){
							fb.push(this.blogs[i])
						}else{
							continue
						}
					}
				}else{
					fb=this.blogs
				}
				
				this.filteredBlogs=fb.filter((blog)=>{					
					return blog.title.match(this.search)
				})
				this.$router.push({
					path:'/search',
					query:{
						filteredBlogs:this.filteredBlogs,
						search:this.search,
						blogs:this.blogs,
						selectTime:this.selectTime,
						
					}
					})
			},
			st(){
				this.selectTime=document.getElementById("st").value
				console.log(this.selectTime)
				
			},
			cst(){
				this.selectTime=''
				console.log(this.selectTime)
			}
			
		},
		created() {
			
			this.$axios.get('https://myblog-9d6a6-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
			.then((res)=>{
				return res.data
			})
			.then((data)=>{
				var blogsArray=[];
				for(let key in data){
					data[key].id=key
					blogsArray.push(data[key])
				}
				this.blogs=blogsArray
				this.total=this.blogs.length
				this.pageNum = Math.ceil(this.blogs.length / this.pageSize) || 1;
				for (let i = 0; i < this.pageNum; i++) {
					this.totalPage[i] = this.blogs.slice(this.pageSize * i, this.pageSize * (i + 1))
				}
				this.dataShow = this.totalPage[this.crtPage]
			})
		
		}
		
		
	}
</script>

<style>
	#show-blogs{
		max-width: 800px;
		margin: 0 auto;
		
	}
	
	.single-blog{
		padding: 20px;
		margin: 20px 0;
		box-sizing: border-box ;
		background: #eee;
		border: 1px dotted #aaa;
	}
	
	#show-blogs a{
		color: #444;
		text-decoration: none;
	}
	
	input{
		padding: 8px;
		width: 60%;
		height: 30px;
		box-sizing: border-box;
	}
	
	button{
		display: inline-block;
		width: 60px;
		height: 40px;
		margin: 10px;
		background: crimson;
		color: #fff;
		border: 0;
		padding: 7px;
		border-radius: 10px;
		font-size: 15px;
		cursor: pointer ;
	}
	.ss{
		margin-left: 20px;
		margin-top: 10px;
	}
	
	.cc{
		margin: 5px 0;
	}
	
	
	
</style>
