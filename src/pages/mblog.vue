<template>
    <div class="mblog-wrapper"  v-loading="loading">
        <mblog-info :blogMid="blogMid"></mblog-info>
        <mblog-chart :blogMid="blogMid"></mblog-chart>
    </div>
</template>

<script>
import MblogInfo from '../components/mblog/mblog-info';
import MblogChart from '../components/mblog/mblog-chart';

export default {
    components: {
        MblogInfo,
        MblogChart,
    },
    data() {
        return {
            blogMid: this.$route.query.BlogMid,
            loading: false,
        }
    },
    created() {
        this.handleBind();
    },
    methods: {
        handleBind() {
            this.$bus.$on('setMblogLoading', params => {
                console.log(params);
                this.$notify.info({
                    title: '该微博未录入',
                    message: '管理员会尽快将该微博信息加入数据库中'
                });
                this.loading = true;
            });
        }
    }
}
</script>

<style scoped>
.mblog-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
