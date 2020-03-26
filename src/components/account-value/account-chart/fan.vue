<template>
    <div class="fan-wrapper">
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
                                    <font class="gender-item-value">{{ fanGenderData.man }}%</font>
                                </div>
                            </dl>
                            <dl class="gender-item">
                                <dt>
                                    <i class="iconfont icon-nv" style="color: #ff6ea5; font-size: 64px"></i>
                                </dt>
                                <div class="gender-item-wrapper">
                                    <font class="gender-item-title">女性</font>
                                    <font class="gender-item-value">{{ fanGenderData.woman }}%</font>
                                </div>
                            </dl>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">存活粉丝数</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <div id="alive-fans"></div>                   
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">去水粉丝数</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <div id="true-fans"></div>                   
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">等级分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-rank"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">粉丝的关注数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-follow-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">粉丝的粉丝数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-follower-count"></div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">粉丝的微博数分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div id="fan-status-count"></div>
            </div>
        </el-scrollbar>

    </div>
</template>

<script>
import G2 from '@antv/g2';
import { getFanGender, getAliveFans, getFanRank, getFanFollowCount, getFanFollowerCount, getFanStatusCount } from '../../../api/account-value/index';

export default {
    data() {
        return {
            fanGenderData: {},
            aliveFansData: [],
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
        getAliveFans({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.aliveFansData = res.Data;
                }
            }
        )
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
        'aliveFansData': function() {
            this.paintAliveFans();
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
        /** 
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
        },*/
        paintAliveFans() {
            // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
            const sliceNumber = 0.01;

            // 自定义 other 的图形，增加两条线
            G2.Shape.registerShape('interval', 'sliceShape', {
                draw(cfg, container) {
                    const points = cfg.points;
                    let path = [];
                    path.push([ 'M', points[0].x, points[0].y ]);
                    path.push([ 'L', points[1].x, points[1].y - sliceNumber ]);
                    path.push([ 'L', points[2].x, points[2].y - sliceNumber ]);
                    path.push([ 'L', points[3].x, points[3].y ]);
                    path.push('Z');
                    path = this.parsePath(path);
                    return container.addShape('path', {
                        attrs: {
                            fill: cfg.color,
                            path
                        }
                    });
                }
            });

            let chart = new G2.Chart({
                container: 'alive-fans',
                forceFit: true,
                height: 150,
                padding: [ 20, 20, 20, 20 ]
            });

            chart.source(this.aliveFansData, {
                        value: {
                            formatter: val => {
                                val = val + '%';
                            return val;
                        }
                    }
                });
            chart.legend(false);
            chart.guide().html({
                position: [ '50%', '50%' ],
                html: `<div style="color:#ff873f;font-size: 14px;text-align: center;width: 10em;">${this.aliveFansData[1].type}<br><span style="color:#ff873f;font-size:16px">${this.aliveFansData[1].value}</span>%</div>`,
                alignX: 'middle',
                alignY: 'middle'
            });
            chart.coord('theta', {
                innerRadius: 0.75
            });
            chart.tooltip({
                showTitle: false
            });
            chart.intervalStack()
                .position('value')
                .color('type', ['#eceef1', '#ff873f'])
                .shape('sliceShape');
            chart.render();

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
.fan-wrapper {
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
