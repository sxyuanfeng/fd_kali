<template>
    <div class="overview-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">价值分析</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box flex">
                    <div class="circle-progress-wrapper">
                        <el-progress type="circle" color="rgb(103,194,58)" :percentage="computedOverview(accountOverviewData, computedActive(accountOverviewData['活跃度']))" stroke-width="13" :format="circleFormat"></el-progress>
                        <font style="color: darkgray; margin-top: 10px;">综合评分</font>
                    </div>
                    <div class="progress-flex line-progress-wrapper">
                        <div class="line-progress">
                            <font class="progress-font">广告投放价值</font>
                            <el-progress :percentage="accountOverviewData['广告投放价值']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">粉丝质量</font>
                            <el-progress :percentage="accountOverviewData['粉丝质量']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">活跃度</font>
                            <el-progress :percentage="computedActive(accountOverviewData['活跃度'])" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">原创度</font>
                            <el-progress :percentage="accountOverviewData['原创度']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">影响力</font>
                            <el-progress :percentage="accountOverviewData['影响力']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getAccountOverview } from '../../../api/account-value/index';
import { differenceInDays } from 'date-fns';

export default {
    data() {
        return {
            accountOverviewData: {},
        }
    },
    created() {
        getAccountOverview({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.accountOverviewData = res.Data;
                }
            }
        )
    },
    methods: {
        circleFormat(percentage) {
            return percentage + '分';
        },
        lineFormat(percentage) {
            return percentage + '/100';
        },
        computedActive(value) {
            return (Math.abs(1000 / differenceInDays(new Date(value[1]), new Date(value[0])))).toFixed(1);
        },
        computedOverview(val1, val2) {
            return ((val1['广告投放价值']+val1['影响力']+val1['粉丝质量']+val1['原创度']+parseFloat(val2)) / 5).toFixed(1);
        }
    }
}
</script>

<style scoped>
.overview-wrapper {
    width: 100%;
    height: 83vh;
}

.vertical-bar::before{
    content: "";
    width: 5px;
    height: 16px;
    position: absolute;
    top: 0px;
    left: -15px;
    background:#ff873f;
}

.breadcrumb-name {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
}

.chart-wrapper {
    margin: 20px 30px;
    position: relative;
}

.flex {
    display: flex;
}

.panel-box {
    box-sizing: border-box;
    border: 1px solid #e6ebf0;
    border-radius: 4px;
    background-color: #fdfdfd;
    margin-top: 10px;
    position: relative;
    right: 15px;
}

.circle-progress-wrapper {
    margin: 20px;
    padding-right: 20px;
    border-right: darkgray 1px solid;
    display: flex;
    flex-direction: column;
}

.line-progress-wrapper {
    margin-top: 35px;
}

.line-progress {
    display: flex;
    flex-direction: row;
    margin: 5px 0 5px 0;
}

.progress-flex {
    flex: 1;
}

.progress-font {
    color: gray;
    font-size: 14px;
    margin-right: 8px;
    width: 100px;
    text-align: right;
}

.line-progress {
    margin-top: 1px;
}

</style>
