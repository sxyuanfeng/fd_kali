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
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">微博指标趋势</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="statuses-index"></div>
                </div>
            </div>
            <el-row>
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">原创微博分析</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <div id="statuses-retweet"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">原创微博分析</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <el-table :data="tableData" border style="width: 100%" class="table-wrapper">
                            <el-table-column prop="notretweet" label="原创微博"></el-table-column>
                            <el-table-column prop="retweet" label="转发微博"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">微博来源</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="statuses-source"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getStatusesTimeline, getStatusesActiveTime, getStatusesIndex, getStatusesRetweet, getStatusesSource } from '../../../api/account-value/index';
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
            statusesIndexData: [],
            statusesRetweetData: [],
            tableData: [],
            statusesSourceData: [],
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
        ),
        getStatusesIndex({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.statusesIndexData = res.Data;
                }
            }
        ),
        getStatusesRetweet({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.statusesRetweetData = res.Data;
                    this.tableData = [
                        {'notretweet': res.Data[1]['value'] + '篇',
                        'retweet': res.Data[0]['value'] + '篇'},
                        {'notretweet': res.Data[1]['percent'] + '%',
                        'retweet': res.Data[0]['percent'] + '%'},
                    ]
                }
            }
        ),
        getStatusesSource({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.statusesSourceData = res.Data;
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
        },
        'statusesIndexData': function() {
            this.paintStatusesIndex();
        },
        'statusesRetweetData': function() {
            this.paintStatusesRetweet();
        },
        'statusesSourceData': function() {
            this.paintStatusesSource();
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
                    min: 0,
                    tickInterval: 1,
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
                showTitle: false,
                itemTpl: '<ul><li>时段：{name}</li><li>数量：{value}</li></ul>'//定义标头
            });
            chart.area().position('time*value').color('time', [ '#E74C3C' ]).shape('smooth').tooltip('time*value', function(time, value) {
                return {
                    name: time,
                    value: value,
                }
            });
            chart.line().position('time*value').color('time', [ '#E74C3C' ]).size(2).shape('smooth').tooltip(false);
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
            chart.tooltip({
                showTitle: false,
                itemTpl: '<ul><li>时段：{name}时</li><li>数量：{value}条</li></ul>'//定义标头
            });
            chart.interval().position('hour*value').color(['#ff873f']).tooltip('hour*value', function(hour, value) {
                return {
                    name: hour,
                    value: value,
                }
            });
            chart.render();
        },
        paintStatusesIndex() {
            let chart = new G2.Chart({
                container: 'statuses-index',
                forceFit: true,
                height: 400,
                padding: [ 20, 40, 80, 60 ]
            });
            chart.source(this.statusesIndexData, {
                index: {
                    type: 'linear',
                }
            });
            chart.scale({
                index: {
                    minLimit: 1
                },
            })
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('value', {
                label: {
                    offset: 25
                }
            });
            chart.area().position('index*value').color('name').shape('smooth');
            chart.line().position('index*value').color('name')
                .size(2).shape('smooth');
            chart.render();
        },
        paintStatusesRetweet() {
            const Shape = G2.Shape;
            // 自定义Shape 部分
            Shape.registerShape('point', 'pointer', {
                drawShape(cfg, group) {
                    const center = this.parsePoint({ // 获取极坐标系下画布中心点
                        x: 0,
                        y: 0
                    });
                    // 绘制指针
                    group.addShape('line', {
                        attrs: {
                            x1: center.x,
                            y1: center.y,
                            x2: cfg.x,
                            y2: cfg.y,
                            stroke: cfg.color,
                            lineWidth: 5,
                            lineCap: 'round'
                        }
                    });
                    return group.addShape('circle', {
                        attrs: {
                            x: center.x,
                            y: center.y,
                            r: 9.75,
                            stroke: cfg.color,
                            lineWidth: 4.5,
                            fill: '#fff'
                        }
                    });
                }
            });
            const data = [
                { value: this.statusesRetweetData[1]['percent']/10 }
            ];
            const chart = new G2.Chart({
                container: 'statuses-retweet',
                forceFit: true,
                height: 200,
                padding: [ 0, 0, 30, 0 ]
            });
            chart.source(data);
            chart.coord('polar', {
                startAngle: -9 / 8 * Math.PI,
                endAngle: 1 / 8 * Math.PI,
                radius: 0.75
            });
            chart.scale('value', {
                min: 0,
                max: 10,
                tickInterval: 1,
                nice: false
            });
            chart.axis('1', false);
            chart.axis('value', {
                zIndex: 2,
                line: null,
                label: {
                    offset: -16,
                    textStyle: {
                        fontSize: 18,
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                },
                subTickCount: 4,
                subTickLine: {
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                tickLine: {
                    length: -17,
                    stroke: '#fff',
                    strokeOpacity: 1
                },
                grid: null
            });
            chart.legend(false);
            chart.point().position('value*1')
            .shape('pointer')
            .color('#1890FF')
            .active(false);
            // 绘制仪表盘背景
            chart.guide().arc({
                zIndex: 0,
                top: false,
                start: [ 0, 0.945 ],
                end: [ 10, 0.945 ],
                style: { // 底灰色
                    stroke: '#CBCBCB',
                    lineWidth: 18
                }
            });
            // 绘制指标
            chart.guide().arc({
                zIndex: 1,
                start: [ 0, 0.945 ],
                end: [ data[0].value, 0.945 ],
                style: {
                    stroke: '#1890FF',
                    lineWidth: 18
                }
            });
            // 绘制指标数字
            chart.guide().html({
                position: [ '50%', '95%' ],
                html: '<div style="width: 300px;text-align: center;">'
                    + '<p style="font-size: 16px; color: #545454;margin: 0;">原创率</p>'
                    + '<p style="font-size: 20px;color: #545454;margin: 0;">' + this.statusesRetweetData[1]['percent'] + '%</p>'
                    + '</div>'
            });
            chart.render();
        },
        paintStatusesSource() {
            let chart = new G2.Chart({
                container: 'statuses-source',
                forceFit: true,
                height: 400,
                padding: [ 20, 20, 20, 150 ]
            });
            chart.source(this.statusesSourceData, {
                        value: {
                            formatter: val => {
                                val = val + '%';
                            return val;
                        }
                    }
                });
            chart.axis('source', {
                label: {
                    offset: 12
                }
            });
            chart.tooltip({
                showTitle: false,
            })
            chart.coord().transpose();
            chart.interval().position('source*value').color('source', [ '#ff873f' ]);
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

.table-wrapper {
    background-color: #fdfdfd;
    margin-top: 10px;
    position: relative;
    right: 15px;
}

</style>
