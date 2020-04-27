<template>
    <div class="covid-wrapper">
        <el-row :gutter="5">
            <covid-chart></covid-chart>
        </el-row>
    </div>
</template>

<script>
import CovidChart from '../components/covid/covid-chart';

export default {
    components: {
        CovidChart,
    }
}
</script>

<style scoped>
.covid-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
