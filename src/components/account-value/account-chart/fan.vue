<template>
    <div class="follow-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">男女比例</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-gender"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">等级分布</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-rank"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">粉丝的关注数分布</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-follow-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">粉丝的粉丝数分布</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-follower-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">粉丝的微博数分布</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-status-count"></div>
            </div>
        </el-scrollbar>

    </div>
</template>

<script>
import G2 from '@antv/g2';
import { getFanGender, getFanRank, getFanFollowCount, getFanFollowerCount, getFanStatusCount } from '../../../api/account-value/index';

export default {
    data() {
        return {
            fanGenderData: [],
            fanRankData: [],
            fanFollowCountData: [],
            fanFollowerCountData: [],
            fanStatusCountData: []
        }
    },
    created() {
        getFanGender({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.fanGenderData = res.Data;
                }
            }
        ),
        getFanRank({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.fanRankData = res.Data;
                }
            }
        ),
        getFanFollowCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.fanFollowCountData = res.Data;
                }
            }
        ),
        getFanFollowerCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.fanFollowerCountData = res.Data;
                }
            }
        ),
        getFanStatusCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.fanStatusCountData = res.Data;
                }
            }
        )
    },
    watch: {
        'fanGenderData': function() {
            this.paintGenderChart()
        },
        'fanRankData': function() {
            this.paintRankChart();
        },
        'fanFollowCountData': function() {
            this.paintFollowCount();
        },
        'fanFollowerCountData': function() {
            this.paintFollowerCount();
        },
        'fanStatusCountData': function() {
            this.paintStatusCount();
        }
    },
    methods: {
        /*
        handleClick(tab, event) {
            console.log(tab, event);
        },
        */
        paintGenderChart() {
            let chart = new G2.Chart({
                container: 'fan-gender',
                forceFit: true,
                height: 400,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.fanGenderData, {
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
            interval.setSelected(this.fanGenderData[0]);
        },
        paintRankChart() {
            let chart = new G2.Chart({
                container: 'fan-rank',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.fanRankData);
            chart.scale('value', {
                alias: '人数'
            });
            chart.axis('type', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    }
                },
                tickLine: {
                    alignWithLabel: false,
                    length: 0
                }
            });
            chart.axis('value', false);
            chart.tooltip({
                share: true
            });

            chart.interval().position('type*value').opacity(1)
                .label('value', {
                    useHtml: true,
                    htmlTemplate: (text, item) => {
                        const a = item.point;
                        a.percent = String(parseInt(a.percent * 100)) + '%';
                        return '<span class="g2-label-item"><p class="g2-label-item-value">' + a.value + '</p><p class="g2-label-item-percent">' + a.percent + '</p></div>';
                    }
                });
            chart.render();
        },
        paintFollowCount() {
            let chart = new G2.Chart({
                container: 'fan-follow-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.fanFollowCountData);
            chart.scale('value', {
                alias: '人数'
            });
            chart.axis('type', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    }
                },
                tickLine: {
                    alignWithLabel: false,
                    length: 0
                }
            });
            chart.axis('value', false);
            chart.tooltip({
                share: true
            });

            chart.interval().position('type*value').opacity(1)
                .label('value', {
                    useHtml: true,
                    htmlTemplate: (text, item) => {
                        const a = item.point;
                        a.percent = String(parseInt(a.percent * 100)) + '%';
                        return '<span class="g2-label-item"><p class="g2-label-item-value">' + a.value + '</p><p class="g2-label-item-percent">' + a.percent + '</p></div>';
                    }
                });
            chart.render();
        },
        paintFollowerCount() {
            let chart = new G2.Chart({
                container: 'fan-follower-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.fanFollowerCountData);
            chart.scale('value', {
                alias: '人数'
            });
            chart.axis('type', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    }
                },
                tickLine: {
                    alignWithLabel: false,
                    length: 0
                }
            });
            chart.axis('value', false);
            chart.tooltip({
                share: true
            });

            chart.interval().position('type*value').opacity(1)
                .label('value', {
                    useHtml: true,
                    htmlTemplate: (text, item) => {
                        const a = item.point;
                        a.percent = String(parseInt(a.percent * 100)) + '%';
                        return '<span class="g2-label-item"><p class="g2-label-item-value">' + a.value + '</p><p class="g2-label-item-percent">' + a.percent + '</p></div>';
                    }
                });
            chart.render();
        },
        paintStatusCount() {
            let chart = new G2.Chart({
                container: 'fan-status-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.fanStatusCountData);
            chart.scale('value', {
                alias: '人数'
            });
            chart.axis('type', {
                label: {
                    textStyle: {
                        fill: '#aaaaaa'
                    }
                },
                tickLine: {
                    alignWithLabel: false,
                    length: 0
                }
            });
            chart.axis('value', false);
            chart.tooltip({
                share: true
            });

            chart.interval().position('type*value').opacity(1)
                .label('value', {
                    useHtml: true,
                    htmlTemplate: (text, item) => {
                        const a = item.point;
                        a.percent = String(parseInt(a.percent * 100)) + '%';
                        return '<span class="g2-label-item"><p class="g2-label-item-value">' + a.value + '</p><p class="g2-label-item-percent">' + a.percent + '</p></div>';
                    }
                });
            chart.render();
        }
    }
}
</script>

<style scoped>
.follow-wrapper {
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
