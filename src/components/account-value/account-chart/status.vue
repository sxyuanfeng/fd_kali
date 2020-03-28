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
                            <div>{{ statusesDays }}</div>
                        </div>
                        <div class="item">
                            <div class="name">平均点赞</div>
                            <div>{{ attitudeMean }}</div>
                        </div>
                        <div class="item">
                            <div class="name">平均评论</div>
                            <div>{{ commentMean }}</div>
                        </div>
                        <div class="item">
                            <div class="name">平均转发</div>
                            <div>{{ repostMean }}</div>
                        </div>
                    </div>
                    <div class="panel-box-inner">
                        <div id="statuses-timeline"></div>
                    </div>
                    <div class="tab-wrapper">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="TOP3点赞数" name="attitude">
                                <mblog-show v-for="(item, index) in top3Attitude" :key="index" :mblogData="item"></mblog-show>
                            </el-tab-pane>
                            <el-tab-pane label="TOP3评论数" name="comment">
                                <mblog-show v-for="(item, index) in top3Comment" :key="index" :mblogData="item"></mblog-show>
                            </el-tab-pane>
                            <el-tab-pane label="TOP3转发数" name="repost">
                                <mblog-show v-for="(item, index) in top3Repost" :key="index" :mblogData="item"></mblog-show>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">发博活跃时间</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="statuses-active-time"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getStatusesTimeline, getStatusesActiveTime } from '../../../api/account-value/index';
import { format, differenceInDays } from 'date-fns'
import G2 from '@antv/g2'
import MblogShow from '../../mblog-show';

export default {
    components: {
        MblogShow,
    },
    data() {
        return {
            statusesTimelineData: [],
            statusesDays: 0,
            attitudeMean: 0,
            commentMean: 0,
            repostMean: 0,
            top3Attitude: [],
            top3Comment: [],
            top3Repost: [],
            activeName: 'attitude',
            statusesActiveTimeData: [],
        }
    },
    created() {
        getStatusesTimeline({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    let newData = this.formatTime(res.Data['statuses_timeline_list']);
                    this.statusesTimelineData = newData;
                    this.statusesDays = differenceInDays(new Date(res.Data['days'][0]), new Date(res.Data['days'][1]));
                    this.attitudeMean = res.Data['attitude_mean'];
                    this.commentMean = res.Data['comment_mean'];
                    this.repostMean = res.Data['repost_mean'];
                    this.top3Attitude = res.Data['top_3_attitude'];
                    this.top3Comment = res.Data['top_3_comment'];
                    this.top3Repost = res.Data['top_3_repost'];
                }
            }
        ),
        getStatusesActiveTime({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    let newData = this.formatHours(res.Data);
                    this.statusesActiveTimeData = newData;
                }
            }
        )
    },
    watch: {
        'statusesTimelineData': function() {
            this.paintTimelineChart();
        },
        'statusesActiveTimeData': function() {
            this.paintStatusesActiveTime();
        }
    },
    methods: {
        formatTime(timeStr) {
            let data = timeStr.map(item => format(new Date(item), 'yyyy-MM-dd'));
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
            return newData;
        },
        formatHours(timeStr) {
            let data = timeStr.map(item => format(new Date(item), 'HH'));
            let dataSet = new Set(data);
            let newData = [];
            for (let i of dataSet) {
                let value = 0;
                for (let j of data) {
                    if (i === j) {
                        value += 1
                    }
                }
                newData.push({'hour': parseInt(i), 'value': value});
            }
            return newData;
        },
        paintTimelineChart() {
            let chart = new G2.Chart({
                container: 'statuses-timeline',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 30, 40 ]
            });
            chart.source(this.statusesTimelineData);
            chart.scale({
                value: {
                    min: 0
                },
                time: {
                    range: [ 0, 1 ]
                }
            });
            chart.axis('value', {
                label: {
                    formatter: val => {
                        return val + '条';
                    }
                }
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.area().position('time*value').color('time', [ '#E74C3C' ]).shape('smooth');
            chart.line().position('time*value').color('time', [ '#E74C3C' ]).size(2).shape('smooth');
            chart.render();
        },
        paintStatusesActiveTime() {
            let chart = new G2.Chart({
                container: 'statuses-active-time',
                forceFit: true,
                height: 400,
                padding: [ 20, 20, 20, 60 ]
            });
            chart.source(this.statusesActiveTimeData);
            chart.scale({
                value: {
                    tickInterval: 10,
                    minLimit: 0,
                },
                hour: {
                    minLimit: 0,
                    maxLimit: 23,
                }
            });
            chart.axis('value', {
                label: {
                    formatter: val => {
                        return val + '条';
                    },
                    offset: 25
                }
            });
            chart.axis('hour', {
                label: {
                    formatter: val => {
                        return val + '时';
                    }
                }
            });
            chart.tooltip('hour*value')
            chart.interval().position('hour*value').color(['#ff873f']);
            chart.render();
        }
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
