<template>
    <div class="page-sidebar-wrapper">
        <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
                <i class="el-icon-user"></i>
                <span slot="title" @click="$router.push({path: '/'})">账号分析</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="iconfont icon-weibo" style="font-size: 19px;"></i>&nbsp;
                <span slot="title" @click="$router.push({path: '/mblogsearch'})">微博分析</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title" @click="$router.push({path: '/hottag'})">热搜词云</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title" @click="$router.push({path: '/repostsearch'})">微博转发关系图</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.page-sidebar-wrapper {
    margin-top: 10px;
}
</style>
