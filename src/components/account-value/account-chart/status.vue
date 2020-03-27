<template>
    <div class="status-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">发博数据分析</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div class="flex">
                        <div class="item">
                            <div class="name">发博天数</div>
                            <div>1</div>
                        </div>
                        <div class="item">
                            <div class="name">平均点赞</div>
                            <div>1</div>
                        </div>
                        <div class="item">
                            <div class="name">平均评论</div>
                            <div>1</div>
                        </div>
                        <div class="item">
                            <div class="name">平均转发</div>
                            <div>1</div>
                        </div>
                    </div>
                    <div class="panel-box-inner">
                        <div id="statuses-timeline"></div>
                    </div>
                    <div class="tab-wrapper">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="TOP3点赞数" name="attitude">
                                <mblog-show></mblog-show>
                            </el-tab-pane>
                            <el-tab-pane label="TOP3评论数" name="comment">
                                <mblog-show></mblog-show>
                            </el-tab-pane>
                            <el-tab-pane label="TOP3转发数" name="repost">
                                <mblog-show></mblog-show>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getMasterStatusesTimeline } from '../../../api/account-value/index';
import { format } from 'date-fns'
import G2 from '@antv/g2';
import MblogShow from '../../mblog-show';

export default {
    components: {
        MblogShow,
    },
    data() {
        return {
            statusesTimeline: [],
            activeName: 'attitude',
        }
    },
    created() {
        getMasterStatusesTimeline({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    let data = res.Data.map(item => format(new Date(item), 'yyyy-MM-dd'));
                    let dataSet = new Set(data);
                    let newData = [];
                    for (let i of dataSet) {
                        let value = 0;
                        for (let j of data) {
                            if (i === j) {
                                value += 1
                            }
                        }
                        newData.push({'time': i, 'value': value});
                    }
                    this.statusesTimeline = newData;
                }
            }
        )
    },
    watch: {
        'statusesTimeline': function() {
            this.paintTimelineChart();
        }
    },
    methods: {
        paintTimelineChart() {
            let chart = new G2.Chart({
                container: 'statuses-timeline',
                forceFit: true,
                height: 300,
                padding: [ 20, 50, 20, 50 ]
            });
            chart.tooltip({
                crosshairs: false
            });
            let view1 = chart.view();
            view1.source(this.statusesTimeline);
            view1.axis('time', {
                subTickCount: 3,
                subTickLine: {
                    length: 3,
                    stroke: '#bfbfbf',
                    lineWidth: 1
                },
                tickLine: {
                    length: 6,
                    lineWidth: 1,
                    stroke: '#bfbfbf'
                },
                label: {
                    textStyle: {
                    fill: '#aaaaaa'
                    }
                }
            });
            view1.axis('value', {
                label: {
                    textStyle: {
                    fill: '#aaaaaa'
                    },
                }
            });
            view1.line().position('time*value');

            chart.render();
        },
    }
}
</script>

<style scoped>
.status-wrapper {
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
    align-items: center;
    justify-content: space-around;
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

.panel-box-inner {
    box-sizing: border-box;
    border: 1px solid #e6ebf0;
    border-radius: 4px;
    background-color: #fdfdfd;
    margin: 10px 20px 10px 20px;
}

.tab-wrapper {
    margin: 20px;
}

.item {
    width: 80px;
    height: 40px;
    margin: 30px 0 20px 0;
}

.item .name {
    font-size: 13px;
    color:darkgray;
    margin-bottom: 10px;
}

</style>
