<template>
    <div class="repost-wrapper" v-loading="loading">
        <el-row :gutter="15">
            <repost-chart :blogMid="blogMid"></repost-chart>
        </el-row>
    </div>
</template>

<script>
import RepostChart from '../components/repost/repost-chart';

export default {
    components: {
        RepostChart,
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
            this.$bus.$on('setRepostLoading', params => {
                console.log(params);
                this.$notify.info({
                    title: '该微博未录入',
                    message: '管理员会尽快将该微博加入数据库中'
                });
                this.loading = true;
            });
        }
    }
}
</script>

<style scoped>
.repost-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
