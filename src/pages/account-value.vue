<template>
    <div class="account-value-wrapper" v-loading="loading">
        <el-row :gutter="15">
            <account-info :accountMid="accountMid"></account-info>
            <account-chart :accountMid="accountMid"></account-chart>
        </el-row>
    </div>
</template>

<script>
import AccountInfo from '../components/account-value/account-info';
import AccountChart from '../components/account-value/account-chart';

export default {
    components: {
        AccountInfo,
        AccountChart,
    },
    data() {
        return {
            accountMid: this.$route.query.AccountMid,
            loading: false,
        }
    },
    created() {
        this.handleBind();
    },
    methods: {
        handleBind() {
            this.$bus.$on('setAccountValueLoading', params => {
                console.log(params);
                this.$notify.info({
                    title: '该账号未录入',
                    message: '管理员会尽快将该账号加入数据库中'
                });
                this.loading = true;
            });
        }
    }
}
</script>

<style scoped>
.account-value-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
