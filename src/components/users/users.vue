<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <div style="margin-top:15px">
        <el-input placeholder="请输入内容" v-model="query" style="width:200px" clearable @clear="resetList">
            <el-button slot="append" icon="el-icon-search" @click='search_List'></el-button>
        </el-input>
        <el-button type="primary" plain @click="alertAddForm">添加用户</el-button>
    </div>

    <!-- 列表项 -->
    <el-table :data="userList" style="width: 100%">
        <el-table-column label="#" type="index" width="80">

        </el-table-column>
        <el-table-column label="姓名" prop="username" width="100">

        </el-table-column>
        <el-table-column label="邮箱" width="180" prop="email">

        </el-table-column>
        <el-table-column label="电话" width="120" prop="mobile">

        </el-table-column>
        <el-table-column label="创建日期" width="180" prop="create_time">
            <template></template>
        </el-table-column>
        <el-table-column label="用户状态" width="120" prop="mg_state">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change='editUserStatus(scope.row)'>
                </el-switch>
            </template>

        </el-table-column>
        <el-table-column label="操作" width="285">
            <template slot-scope="abc">
                <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click='alertEditForm(abc.row)'></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click='delUserList(abc.row.id)'></el-button>
                <!-- 分配角色 -->
                <el-button type="success" icon="el-icon-check" circle size="mini" plain @click='alertAssignRoles(abc.row)'></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加弹出层 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" width="60%">
        <el-form :model="formdata" class="formWidth">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formdata.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formdata.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formdata.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserList()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑弹出层 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit" width="60%">
        <el-form :model="formdata" class="formWidth">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formdata.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formdata.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formdata.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUserList()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleEditRoles">
        <el-form label-width="80px">
            <el-form-item label="用户名">
                {{curUserName}}
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="currUserList" placeholder="请选择活动区域">
                    <el-option label="请选择" value="-1" disabled></el-option>
                    <el-option v-for='(v,i) in arrRole' :key="i" :label="v.roleName" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEditRoles = false">取 消</el-button>
            <el-button type="primary" @click="editUserRoles()">确 定</el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            total: 1,
            query: '',
            pagenum: 1,
            pagesize: 2,
            userList: [{
                username: '',
                email: '',
                mobile: '',
                create_time: '',
                mg_state: '',
                id: 0
            }],
            // 弹出层
            dialogFormVisible: false,
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit: false,
            dialogFormVisibleEditRoles: false,
            formdata: {
                username: '',
                password: '',
                email: '',
                mobile: '',
                id: -1
            },
            formLabelWidth: '120px',
            // 当前用户的角色
            currUserList: "-1",
            // 当前用户的姓名
            curUserName: '',
            // 角色数组
            arrRole: [],
            // 当前用户的id
            currUserId:''

        }
    },
    created() {
        this.getUserList();

    },
    methods: {
        // 获取到用户数据列表

        // 参数名 参数说明 备注
        // query 查询参数 可以为空
        // pagenum 当前页码 不能为空
        // pagesize 每页显示条数 不能为空
        // 修改用户的状态
        editUserStatus(data) {
            // 请求路径：users/:uId/state/:type
            this.$http.put(`users//state/:type`)
            console.log(data);

          
        },

        // 编辑用户角色
         async editUserRoles() {
            this.dialogFormVisibleEditRoles = false
            console.log(this.formdata)
            const res = await this.$http.put(`users/${this.currUserId}/role`, {
                rid: this.currUserList
            })
            console.log(res)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
            } else {
                this.$message.error(mag)
            }
            // 把用户角色重置
            this.currUserList = "-1"
        },
        // 弹出分配角色
        async alertAssignRoles(data) {
            this.dialogFormVisibleEditRoles = true
            // 获取到角色的信息(查询角色)
            const res = await this.$http.get(`roles`)
            //    const {data,meta:{msg,status}}=res.data
            this.arrRole = res.data.data
            console.log(res)
            this.curUserName = data.username
            // 根据id查询用户的信息
            const userinfo = await this.$http.get(`users/${data.id}`)
            console.log(userinfo)
            this.currUserList = userinfo.data.data.rid
            this.currUserId=userinfo.data.data.id

        },

        // 编辑用户列表
        async editUserList() {
            //    编辑用户提交
            // users/:id

            const res = await this.$http.put(`users/${this.formdata.id}`, this.formdata)
            // console.log(res);
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
                this.dialogFormVisibleEdit = false
            } else {
                this.message.error(msg)
            }

        },
        // 弹出编辑表单
        alertEditForm(data) {
            this.dialogFormVisibleEdit = true
            // console.log(data);
            // data获取到当前行的信息
            this.formdata = data;
        },

        // 弹出添加用户信息表单
        alertAddForm() {
            this.dialogFormVisibleAdd = true
            this.formdata = {}

        },
        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem('token');
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res);
            const {
                data: {
                    total,
                    pagenum,
                    users
                },
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (res.status === 200) {
                // console.log(res);
                this.total = total
                this.pagenum = pagenum
                this.userList = users
                this.$message.success(msg)
            } else {
                this.$message.error(mag)
            }

        },
        // 添加用户列表
        async addUserList() {
            this.dialogFormVisibleAdd = false
            // 设置的请求头
            const AUTH_TOKEN = localStorage.getItem('token');
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

            const res = await this.$http.post('users', this.formdata)
            // console.log(res)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 201) {
                this.$message.success(msg);
                this.getUserList();
            } else {
                this.$message.error(msg);

            }
        },
        // 删除用户列表
        delUserList(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`users/${id}`)
                // console.log(res)
                const {
                    meta: {
                        msg,
                        status
                    }
                } = res.data
                this.pagenum = 1
                this.getUserList();
                this.$message({
                    type: 'success',
                    message: msg
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });
            });
        },
        // 根据用户输入的内容寻找列表
        search_List() {
            // console.log(this.query);
            this.getUserList();
        },

        handleEdit(index, row) {
            // console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getUserList();
        },

        // 分页当前是第几页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },
        // 点击输入框的 X 按钮
        resetList() {
            this.getUserList();
        }
    }
}
</script>

<style>

</style>
