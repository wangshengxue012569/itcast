<template>
<el-container class="dev-container">
    <el-header class="dev-header">
        <el-row :gutter="20">
            <el-col :span="4">
                <img src="../../static/logo.png">
            </el-col>
                <el-col :span="18" class="name">
                    <h2 class="name_title">电商后台管理系统</h2>
                </el-col>
                <el-col :span="2">
                    <a @click="loginout" class="logout">退出</a>
                </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="dev-aside">
            <el-menu default-active="2" :unique-opened='true' class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span>用户管理</span>
                    </template>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span>选项4</span>
                        </template>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>权限管理</span>
                    </template>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>角色列表</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>权限列表</span>
                        </template>

                    </el-submenu>

                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>商品管理</span>
                    </template>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>商品列表</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>分类参数</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>商品分类</span>
                        </template>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-phone"></i>
                        <span>订单管理</span>
                    </template>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-phone"></i>
                            <span>订单列表</span>
                        </template>
                    </el-submenu>          
                </el-submenu>
                  <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                        <span>数据统计</span>
                    </template>
                    <el-submenu index="1-4">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>数据报表</span>
                        </template>
                    </el-submenu>          
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main class="dev-main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate(){
        if(!localStorage.getItem('token')){
            this.$router.push({name:'login'})
            this.$message.error('请您先登录')
        }
    },
    methods:{
        loginout(){
            localStorage.clear();
            this.$router.push({name:'login'})
            this.$message.warning('退出成功!!!!')
        }
    }

}
</script>

<style>
.dev-container {
    height: 100%;
}

.dev-header {
    background: #b3c0d1;
}

.dev-aside {
    background-color: #d3dce6;
}

.dev-main {
    background-color: #e9eef3;
}

.name {
    text-align: center;
    line-height: 1;
}

.name_title {
    color: #fff;
}

.logout {
    display: block;
    padding-top: 20px;
}
</style>
