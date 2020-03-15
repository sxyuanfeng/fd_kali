<template>
    <div class="hot-tag-wrapper">
        <el-row :gutter="15">
            <hottag-chart></hottag-chart>
        </el-row>
    </div>
</template>

<script>
import HottagChart from '../components/hot-tag/hottag-chart';

export default {
    components: {
        HottagChart,
    }
}
</script>

<style scoped>
.hot-tag-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
