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
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">加V比例</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <div id="follow-addV"></div>            
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">关注量级分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="follow-measure"></div>
                </div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">人群标签</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="follow-verified-type"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { getFollowGender, getFollowAddV, getFollowMeasure, getFollowVerifiedType } from '../../../api/account-value/index';

export default {
    data() {
        return {
            followGenderData: {},
            followAddVData: [],
            followMeasureData: [],
            followVerifiedTypeData: [],
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
        getFollowAddV({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followAddVData = res.Data;
                }
            }
        ),
        getFollowMeasure({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followMeasureData = res.Data;
                }
            }
        ),
        getFollowVerifiedType({'master_id': this.$route.query.AccountMid}).then(
            res => {
                if (res.Code === 1) {
                    this.followVerifiedTypeData = res.Data;
                }
            }
        )
    },
    watch: {
        'followAddVData': function() {
            this.paintFollowAddV();
        },
        'followMeasureData': function() {
            this.paintFollowMeasure();
        },
        'followVerifiedTypeData': function() {
            this.paintFollowVerifiedType();
        }
    },
    methods: {
        /**
        handleClick(tab, event) {
            console.log(tab, event);
        },*/
        paintFollowAddV() {
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
                container: 'follow-addV',
                forceFit: true,
                height: 150,
                padding: [ 20, 20, 20, 20 ]
            });

            chart.source(this.followAddVData, {
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
                html: `<div style="color:#F4D03F;font-size: 14px;text-align: center;width: 10em;">${this.followAddVData[1].type}<br><span style="color:#F4D03F;font-size:16px">${this.followAddVData[1].value}</span>%</div>`,
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
                .color('type', ['#eceef1', '#F4D03F'])
                .shape('sliceShape');
            chart.render();
        },
        paintFollowMeasure() {
            let chart = new G2.Chart({
                container: 'follow-measure',
                forceFit: true,
                height: 400,
                padding: [ 20, 20, 20, 80 ]
            });
            chart.source(this.followMeasureData, {
                        percent: {
                            formatter: val => {
                                val = val + '%';
                            return val;
                        }
                    }
                });
            chart.axis('amount', {
                label: {
                    offset: 12
                }
            });
            chart.coord().transpose();
            chart.interval().position('amount*percent').color('amount', [ '#ff873f' ]);
            chart.render();
        },
        paintFollowVerifiedType() {
            let chart = new G2.Chart({
                container: 'follow-verified-type',
                forceFit: true,
                height: 400,
                padding: [ 10, 20, 10, 20 ]
            });
            const dv = new DataSet.View().source(this.followVerifiedTypeData);
            dv.transform({
                type: 'fold',
                fields: [ 'percent' ], // 展开字段集
                key: 'label', // key字段
                value: 'score' // value字段
            });
            chart.source(dv, {
                        score: {
                            formatter: val => {
                                val = val + '%';
                            return val;
                        }
                    }
                });
            chart.legend(false);
            chart.coord('polar', {
                radius: 0.8
            });
            chart.axis('item', {
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
            chart.line().position('item*score').color('label')
                .size(2);
            chart.point().position('item*score').color('label')
                .shape('circle')
                .size(4)
                .style({
                    stroke: '#fff',
                    lineWidth: 1,
                    fillOpacity: 1
                });
            chart.area().position('item*score').color('label');
            chart.render();
        },
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
