<template>
    <div class="account-value-wrapper">
        <el-row :gutter="15">
            <account-info></account-info>
            <account-chart></account-chart>
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
    }
}
</script>

<style scoped>
.account-value-wrapper {
    background: #F8F9F9;
    padding: 15px;
}
</style>
