<template>
    <div class="account-chart-wrapper">
        <el-col :span="16">
            <el-card shadow="hover" class="account-chart-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="关注分析" name="follow"></el-tab-pane>
                    <el-tab-pane label="粉丝分析" name="fan"></el-tab-pane>
                    <el-tab-pane label="最近微博" name="status"></el-tab-pane>
                    <el-tab-pane label="真假粉丝" name="fourth"></el-tab-pane>
                    <router-view></router-view>
                </el-tabs>
            </el-card>
        </el-col>
    </div>
</template>

<script>

export default {
    data() {
        return {
            activeName: 'follow',
            tabRoute: {
                'follow': '/follow',
                'fan': '/fan',
                'status': '/status',
            }
        }
    },
    created() {
        this.$router.push({path: 'follow'});
    },
    methods: {
        handleClick(v) {
            this.$router.push({path: this.tabRoute[v.name]});
        }
    }
}
</script>

<style scoped>

</style>
