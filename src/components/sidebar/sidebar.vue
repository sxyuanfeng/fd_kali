<template>
    <div class="page-sidebar-wrapper">
        <ul>
            <li class="sidebar-button">
                <span @click="$router.push({path: '/follow'})" class="sidebar-name">账号价值分析</span>
            </li>
            <li class="sidebar-button">
                <span @click="$router.push({path: '/hottag'})" class="sidebar-name">热搜词云</span>
            </li>
            <li class="sidebar-button">
                <span @click="$router.push({path: '/repost'})" class="sidebar-name">微博转发关系图</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.sidebar-button {
    margin: 40px;
    cursor: pointer;
}

.sidebar-name {
    color: #566573;
}
</style>
