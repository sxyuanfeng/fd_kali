<template>
    <div class="follow-wrapper">
        <el-scrollbar style="height: 100%">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">性别分布</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box flex">
                            <dl class="gender-item">
                                <dt>
                                    <i class="iconfont icon-nan" style="color: #409eff; font-size: 64px"></i>
                                </dt>
                                <div class="gender-item-wrapper">
                                    <font class="gender-item-title">男性</font>
                                    <font class="gender-item-value">{{ followGenderData.man }}%</font>
                                </div>
                            </dl>
                            <dl class="gender-item">
                                <dt>
                                    <i class="iconfont icon-nv" style="color: #ff6ea5; font-size: 64px"></i>
                                </dt>
                                <div class="gender-item-wrapper">
                                    <font class="gender-item-title">女性</font>
                                    <font class="gender-item-value">{{ followGenderData.woman }}%</font>
                                </div>
                            </dl>
                        </div>
                    </div>
                </el-col>
            </el-row>
            
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">关注的关注数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="follow-follow-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">关注的粉丝数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="follow-follower-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">关注的微博数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="follow-status-count"></div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import { getFollowGender, getFollowRank, getFollowFollowCount, getFollowFollowerCount, getFollowStatusCount } from '../../../api/account-value/index';

export default {
    data() {
        return {
            followGenderData: {},
            followRankData: [],
            followFollowCountData: [],
            followFollowerCountData: [],
            followStatusCountData: [],
        }
    },
    created() {
        getFollowGender({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followGenderData = res.Data;
                }
            }
        ),
        getFollowRank({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followRankData = res.Data;
                }
            }
        ),
        getFollowFollowCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followFollowCountData = res.Data;
                }
            }
        ),
        getFollowFollowerCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followFollowerCountData = res.Data;
                }
            }
        ),
        getFollowStatusCount({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followStatusCountData = res.Data;
                }
            }
        )
    },
    watch: {
        'followRankData': function() {
            this.paintRankChart();
        },
        'followFollowCountData': function() {
            this.paintFollowCount();
        },
        'followFollowerCountData': function() {
            this.paintFollowerCount();
        },
        'followStatusCountData': function() {
            this.paintStatusCount();
        }
    },
    methods: {
        /**
        handleClick(tab, event) {
            console.log(tab, event);
        },*/
        /** 
        paintGenderChart() {
            let chart = new G2.Chart({
                container: 'follow-gender',
                forceFit: true,
                height: 400,
            });
            chart.source(this.followGenderData, {
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
            interval.setSelected(this.followGenderData[0]);
        },*/
        paintRankChart() {
            let chart = new G2.Chart({
                container: 'follow-rank',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.followRankData);
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
                container: 'follow-follow-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.followFollowCountData);
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
                container: 'follow-follower-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.followFollowerCountData);
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
                container: 'follow-status-count',
                forceFit: true,
                height: 500,
                padding: [ 50, 20, 50, 20 ]
            });
            chart.source(this.followStatusCountData);
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

.panel-box {
    box-sizing: border-box;
    border: 1px solid #e6ebf0;
    border-radius: 4px;
    background-color: #fdfdfd;
    margin-top: 10px;
    position: relative;
    right: 15px;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.gender-item {
    padding: 35px 0;
    width: 150px;
    box-sizing: border-box;
    display: flex;
}

.gender-item-wrapper {
    display: flex; 
    flex-direction: column;
}

.gender-item-title {
    color: #606266;
    font-size: 14px;
    margin: 8px 0 5px 10px;
    text-align: left;
    
}

.gender-item-value {
    color: #303133;
    font-size: 20px;
    margin: 5px 0 5px 10px;
}

</style>
