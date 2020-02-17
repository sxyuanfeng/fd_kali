<template>
    <div class="follow-wrapper">
        <el-scrollbar style="height: 100%">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item style="font-size: 20px;">男女比例</el-breadcrumb-item>
            </el-breadcrumb>
            <div id="follow-gender"></div>
            <div id="follow-rank"></div>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
        </el-scrollbar>

    </div>
</template>

<script>
import G2 from '@antv/g2';
import { getFollowGender, getFollowRank } from '../../../api/account-value/index';

export default {
    data() {
        return {
            chartData: [],
        }
    },
    created() {
        getFollowGender({'master_name': '乐拉啊啊啊'}).then(
            res => {
                this.chartData = res;
                console.log('数据更新完毕');
            }
        ),
        getFollowRank({'master_name': '乐拉啊啊啊'}).then(
            res => {
                console.log(res);
            }
        )
    },
    watch: {
        'chartData': function() {
            this.paintChart()
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        paintChart() {
            let chart = new G2.Chart({
                container: 'follow-gender',
                forceFit: true,
                height: 400,
            });
            chart.source(this.chartData, {
                percent: {
                    formatter: val => {
                        val = (val * 100) + '%';
                        return val;
                    }
                }
            });
            chart.coord('theta', {
                radius: 0.75,
                innerRadius: 0.6
            });
            chart.tooltip({
                showTitle: false,
                itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            });
            const interval = chart.intervalStack()
                .position('percent')
                .color('item')
                .label('percent', {
                    formatter: (val, item) => {
                        return item.point.item + ': ' + val;
                    }
            })
            .tooltip('item*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent
                };
            })
            .style({
                lineWidth: 1,
                stroke: '#fff'
            });
            chart.render();
            interval.setSelected(this.chartData[0]);
            console.log('绘制完成');
        }
    }
}
</script>

<style scoped>
.follow-wrapper {
    width: 100%;
    height: 83vh;
}
</style>
