<!-- 登录页面 -->
<template>
    <div class="login-bg">
        <div class="login-section">
            <p class="logo-title">丰仓创新基金管理后台</p>
            <div class="login-block">
                <div class="show-pic">
                    <img src="../assets/images/login_func.png" alt="" >
                </div>
                <div class="input-section">
                    <div class="title">用户登录</div>
                    <div>
                        <div class="input-line">
                            <span class="label">账号</span>
                            <el-input type="text" placeholder="请输入账号" class="input-text" v-model.trim="username" autocomplete="false" maxlength="10"/>
                        </div>
                        <div class="input-line">
                            <span class="label">密码</span>
                            <el-input type="password" placeholder="请输入密码" class="input-password" v-model.trim="password" autocomplete="false" maxlength="12"/>
                        </div>
                        <div class="input-line">
                            <span class="label">验证码</span>
                            <el-input placeholder="请输入验证码" class="input-code" maxlength="4" v-model.trim="code" autocomplete="false" />
                            <img class="code-img" src=""/>
                            <a class="refresh-btn">刷新</a>
                        </div>
                        <div>
                            <el-button class="login-btn" type="primary">登录</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({})
    export default class Login extends Vue {
        private username = ''; // 用户名
        private password = ''; // 密码
        private code = ''; // 验证码

        private login(){
            console.log(this.username);
            console.log(this.password);
        }

        private doLogin(){

        }
    }
</script>

<style lang="scss" scoped>
    .login-bg{
        width: 100%;
        height: 100%;
        background: #4e9fe1 url(../assets/images/login_bg.png) center top no-repeat;
        overflow: hidden;
    }
    .login-section{
        padding-top: 160px;
        .logo-title{
            text-align: center;
            color: #fff;
            font-size: 32px;
            font-weight: bold;
        }
    }
    .login-block{
        width: 1100px;
        background: #fff;
        border-radius: 5px;
        margin: 30px auto 0;
        display: flex;
        padding: 80px 40px;
        .show-pic{
            margin-right: 120px;
            margin-left: 80px;
            padding-top: 35px;
            img{
                width: 360px;
                height: 320px;
            }
        }
        .input-section{
            box-shadow: rgb(203, 203, 203) 0 0 6px;
            padding: 0 25px 30px;
            border-radius: 5px;
            width: 370px;
            .title{
                text-align: center;
                font-size: 16px;
                line-height: 50px;
                border-bottom: 1px solid #ccc;
            }
            .input-line{
                margin-top: 20px;
                &:nth-child(1){
                    margin-top: 30px;
                }
                .label{
                    width: 50px;
                    display: inline-block;
                    margin-right: 10px;
                    text-align: right;
                    font-size: 14px;
                }
                .input-text,
                .input-password{
                    width: 260px;
                }
                .input-code{
                    width: 140px;
                }
                .code-img{
                    width: 70px;
                    height: 42px;
                    display: inline-block;
                    margin: 0 10px;
                }
                .refresh-btn{
                    display: inline-block;
                    color: #1a7ef8;
                    font-size: 14px;
                    line-height: 42px;
                    cursor: pointer;
                }
            }
        }
        .login-btn{
            width: 220px;
            height: 44px;
            margin-left: 60px;
            margin-top: 30px;
        }
    }
    /deep/ .input-password.el-input,
    /deep/ .input-code.el-input,
    /deep/ .input-text.el-input{
        height: 42px;
        .el-input__inner{
            border-color: #ccc;
            line-height: 42px;
            height: 42px;
            border-radius: 4px;
            padding-left: 14px;
            padding-right: 14px;
            font-size: 15px;
        }
    }
</style>
