<template>
    <div class="status-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">最近微博发布时间</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="master-statuses-timeline"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">微博指标</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="master-statuses-index"></div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getMasterStatusesTimeline, getMasterStatusesIndex } from '../../../api/account-value/index';
import { format } from 'date-fns'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default {
    data() {
        return {
            masterStatusesTimeline: [],
            masterStatusesIndex: [],
        }
    },
    created() {
        getMasterStatusesTimeline({'master_name': '乐拉啊啊啊'}).then(
            res => {
                let data = res.map(item => format(new Date(item), 'yyyy-MM-dd'));
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
                this.masterStatusesTimeline = newData;
            }
        ),
        getMasterStatusesIndex({'master_name': '乐拉啊啊啊'}).then(
            res => {
                this.masterStatusesIndex = res.map(item => {
                    return {'time': item.time.split(' ')[1] + ' ' + item.time.split(' ')[2] + ' ' + item.time.split(' ')[5]
                    + ' ' + item.time.split(' ')[3], '点赞': item.attitudes, '评论': item.comments, '转发': item.reposts}
                }) 
            }
        )
    },
    watch: {
        'masterStatusesTimeline': function() {
            this.paintTimelineChart();
        },
        'masterStatusesIndex': function() {
            this.paintIndexChart();
        }
    },
    methods: {
        paintTimelineChart() {
            let chart = new G2.Chart({
                container: 'master-statuses-timeline',
                forceFit: true,
                height: 500,
                padding: [ 50, 50, 50, 50 ]
            });
            chart.tooltip({
                crosshairs: false
            });
            let view1 = chart.view();
            view1.source(this.masterStatusesTimeline);
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
        paintIndexChart() {
            let chart = new G2.Chart({
                container: 'master-statuses-index',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            const dv = new DataSet.View().source(this.masterStatusesIndex);
            dv.transform({
                type: 'fold',
                fields: [ '点赞', '评论', '转发' ], // 展开字段集
                key: 'label', // key字段
                value: 'score' // value字段
            });
            chart.source(dv);
            chart.coord('polar', {
                radius: 0.8
            });
            chart.axis('time', {
                line: null,
                tickLine: null,
                grid: {
                    lineStyle: {
                        lineDash: null
                    },
                    hideFirstLine: false
                }
            });
            chart.axis('score', {
                line: null,
                tickLine: null,
                grid: {
                    type: 'polygon',
                    lineStyle: {
                        lineDash: null
                    },
                    alternateColor: 'rgba(0, 0, 0, 0.04)'
                }
            });
            chart.legend('label', {
                marker: 'circle',
                offset: 30
            });
            chart.line().position('time*score').color('label')
                .size(2);
            chart.point().position('time*score').color('label')
                .shape('circle')
                .size(4)
                .style({
                    stroke: '#fff',
                    lineWidth: 1,
                    fillOpacity: 1
                });
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
