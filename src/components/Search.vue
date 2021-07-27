<template>
	<div id="search">
		<h1 class="showtit">搜索结果</h1>
		<hr style="margin-bottom: 10px;">
		<input type="text" v-model="search" name="" id="" value="" placeholder="搜索"/>
		<DatePicker :value="selectTime" @on-change="st" element-id="st" @on-clear="cst" @on-ok="st"  type="date"  confirm placeholder="选择时间" style="width:200px;margin-left: 10px;"></DatePicker>
		<div class="single-blog" v-for="(item,index) in filteredBlogs" :key="index" >
			<router-link :to="'/blog/'+item.id">
			<h2 v-tit>{{item.title | toUppercase}}</h2>
			<p class="tm">时间：{{item.time}}</p>
			<el-tag v-for="(item2,index2) in item.categories" :key="index+'-'+index2">{{item2}}</el-tag>
			<hr class="cc" color="azure" noshade="">
			<article v-html="$options.filters.snippet(item.content)">
			</article>
			</router-link>
		</div>
		<div v-if="filteredBlogs.length==0" class="single-blog">
			<h3>抱歉，没有找到 {{search}} 相关内容</h3>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'search',
		data(){
			return{
				
				NfilteredBlogs:[],
				search:'',
				selectTime:"",
				blogs:[]
			}
		},
		created() {
			this.NfilteredBlogs=this.$route.query.filteredBlogs
			this.search=this.$route.query.search
			this.blogs=this.$route.query.blogs
			this.selectTime=this.$route.query.selectTime
			
		},
		methods:{
			st(){
				this.selectTime=document.getElementById("st").value
				console.log(this.selectTime)
			},
			cst(){
				this.selectTime=''
				console.log(this.selectTime)
			}
		},
		computed:{
			filteredBlogs(){
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
				return fb.filter((blog)=>{
					return blog.title.match(this.search)
				})
				
			}
		}
	}
</script>

<style scoped>
	#search{
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
		width: 70%;
		box-sizing: border-box;
	}
	

</style>
