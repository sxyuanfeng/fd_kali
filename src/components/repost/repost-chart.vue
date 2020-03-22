<template>
    <div repost-chart-wrapper>
        <el-col :span="24">
            <el-card shadow="hover" class="account-chart-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-scrollbar style="height: 100%">
                        <div class="chart-wrapper">
                            <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                                <el-breadcrumb-item style="font-size: 20px;">词云图</el-breadcrumb-item>
                            </el-breadcrumb>
                            <iframe ref="repostchart" frameborder="0" width="1000px" height="600px" srcdoc="<p>词云图</p>"></iframe>
                        </div>
                    </el-scrollbar>
                </el-tabs>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import { getRepostChart } from '../../api/repost/index';

export default {
    created() {
        getRepostChart().then(
            res => {
                this.$refs.repostchart.srcdoc = res;
            }
        );
    }
}
</script>

<style scoped>
.repost-chart-wrapper {
    width: 100%;
    height: 83vh;
}

.vertical-bar::before{
    content: "";
    width: 5px;
    height: 30px;
    position: absolute;
    top: -5px;
    left: -15px;
    background:#F8C471;
}

.chart-wrapper {
    margin: 20px 30px;
    position: relative;
}
</style>
