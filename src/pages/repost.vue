<template>
    <div class="repost-wrapper">
        <el-row :gutter="15">
            <repost-chart></repost-chart>
        </el-row>
    </div>
</template>

<script>
import RepostChart from '../components/repost/repost-chart';

export default {
    components: {
        RepostChart,
    }
}
</script>

<style scoped>
.repost-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
