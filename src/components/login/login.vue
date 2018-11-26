<template>
<div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="用户名" >
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click.prevent='getLogin'>主要按钮</el-button>
    </el-form>

</div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                username: '',
                password: '',

            }
        };
    },
    methods:{
       async getLogin(){
            // es7的一个新特性（看着像同步的）
            // this.$http()
            const res=await this.$http.post('login',this.formdata)
                console.log(res);
                const {data,meta:{msg,status}}=res.data;
                if(status===200){
                    this.$router.push({name:'home'});
                    localStorage.setItem('token',data.token);
                    this.$message.success(msg);
                }else{
                    this.$message.warning(msg)
                }
            



            // this.$http()
            // this.$http.post('login',this.formdata).then((res)=>{
            //     console.log(res);
            //     const {data,meta:{msg,status}}=res.data;
            //     if(status===200){
            //         this.$router.push({name:'home'});
            //         localStorage.setItem('token',data.token);
            //         this.$message.success(msg);
            //     }else{
            //         this.$message.warning(msg)
            //     }
            // })

        }
    }

}
</script>

<style>
.login-wrap{
    height: 100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;

}
.login-wrap .login-form{
    width: 400px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;

}
.login-btn{
    width: 100%;
}


</style>
