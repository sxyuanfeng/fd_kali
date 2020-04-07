<template>
    <div class="mblog-chart-wrapper">
        <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="参与者信息" name="participant"></el-tab-pane>
                <el-tab-pane label="传播分析" name="spread"></el-tab-pane>
                <el-tab-pane label="总览" name="overview"></el-tab-pane>
                <router-view></router-view>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        blogMid: {
            type: Number,
        },
    },
    data() {
        return {
            activeName: 'participant',
            tabRoute: {
                'participant': '/mblog/participant',
                'spread': '/mblog/spread',
                'overview': '/mblog/overview',
            }
        }
    },
    created() {
        this.$router.replace({
            path: '/mblog/participant',
            query: {
                    BlogMid: this.blogMid,
                }
            });
    },
    methods: {
        handleClick(v) {
            this.$router.push({
                path: this.tabRoute[v.name],
                query: {
                        BlogMid: this.blogMid,
                    }
                });
        }
    }
}
</script>

<style scoped>
.mblog-chart-wrapper {
    
}
</style>
