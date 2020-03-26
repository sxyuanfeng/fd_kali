<template>
    <div class="account-chart-wrapper">
        <el-col :span="17">
            <el-card shadow="hover" class="account-chart-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="关注画像" name="follow"></el-tab-pane>
                    <el-tab-pane label="粉丝画像" name="fan"></el-tab-pane>
                    <el-tab-pane label="微博分析" name="status"></el-tab-pane>
                    <el-tab-pane label="总览" name="fourth"></el-tab-pane>
                    <router-view></router-view>
                </el-tabs>
            </el-card>
        </el-col>
    </div>
</template>

<script>

export default {
    props: {
        accountMid: {
            type: Number,
        },
    },
    data() {
        return {
            activeName: 'follow',
            tabRoute: {
                'follow': '/accountvalue/follow',
                'fan': '/accountvalue/fan',
                'status': '/accountvalue/status',
            }
        }
    },
    created() {
        this.$router.replace({
            path: '/accountvalue/follow',
            query: {
                    AccountMid: this.accountMid,
                }
            });
    },
    methods: {
        handleClick(v) {
            this.$router.push({
                path: this.tabRoute[v.name],
                query: {
                        AccountMid: this.accountMid,
                    }
                });
        }
    }
}
</script>

<style scoped>

</style>
