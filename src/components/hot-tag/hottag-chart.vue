<template>
    <div class="account-chart-wrapper">
        <el-col :span="24">
            <el-card shadow="hover" class="account-chart-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="热搜词云" name="first">
                        <keyword></keyword>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import Keyword from './hottag-chart/keyword';

export default {
    components: {
        Keyword,
    },
    data() {
        return {
            activeName: 'first'
        }
    },
}
</script>

<style scoped>

</style>
