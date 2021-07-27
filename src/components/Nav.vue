<template>
	<nav>
		<ul>
			<li>
				<router-link to="/" exact>首页</router-link> 
				<router-link to="/add" exact>写博客</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default{
		name:'blog-nav'
	}
</script>

<style scoped="scoped">
	ul{
		list-style-type: none;
		text-align: right;
		margin: 0;
	}
	li{
		display: inline-block;
		margin: 0 10px;
	}
	a{
		color: #fff;
		text-decoration: none;
		padding: 12px;
		border-radius: 5px;
	}
	nav{
		background: #555;
		padding: 30px 0;
		margin-bottom: 40px;
	}
	
	.router-link-active{
		background: #55ffff;
		color: #444;
	}
</style>
