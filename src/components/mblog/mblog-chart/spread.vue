<template>
    <div class="spread-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">转发时间趋势</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="spread-timeline"></div>
                </div>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">微博转发关系图</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <iframe ref="spreadrepostrelative" frameborder="0" width="800px" height="420px" srcdoc=""></iframe>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">微博转发深度</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            <div id="spread-deep"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">传播关键用户</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box flex">
                            <div>
                                <el-avatar :size="65" :src="spreadRepostKeyuserData['avatar']"></el-avatar>
                                <div style="margin: 7px ">
                                    <div class="author-name">{{ spreadRepostKeyuserData['name'] }}</div>
                                    <div>
                                        <span>{{ spreadRepostKeyuserData['followers_count'] }}</span>
                                        <span>关注</span>
                                    </div>
                                </div>
                            </div>
                            <div>22</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item>
                                <font class="breadcrumb-name">关键用户传播路径</font>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="panel-box">
                            
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-scrollbar>
    </div>
</template>

<script>
import { getSpreadTimeline, getSpreadRepostRelative, getSpreadRepostDeep, getSpreadRepostKeyuser } from '../../../api/mblog/index';
import G2 from '@antv/g2';

export default {
    data() {
        return {
            spreadTimelineData: [],
            spreadRepostDeepData: [],
            spreadRepostKeyuserData: {},
        }
    },
    created() {
        getSpreadTimeline({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadTimelineData = res.Data;
                }
            }
        );
        getSpreadRepostRelative({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.$refs.spreadrepostrelative.srcdoc = res.Data;
                }
            }
        );
        getSpreadRepostDeep({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadRepostDeepData = res.Data;
                }
            }
        );
        getSpreadRepostKeyuser({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadRepostKeyuserData = res.Data;
                }
            }
        )
    },
    watch: {
        'spreadTimelineData': function() {
            this.paintSpreadTimeline();
        },
        'spreadRepostDeepData': function() {
            this.paintSpreadRepostDeep();
        }
    },
    methods: {
        paintSpreadTimeline() {
            let chart = new G2.Chart({
                container: 'spread-timeline',
                forceFit: true,
                height: 300,
                padding: [ 20, 60, 30, 60 ]
            });
            chart.source(this.spreadTimelineData);
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
        paintSpreadRepostDeep() {
            const chart = new G2.Chart({
            container: 'spread-deep',
                forceFit: true,
                height: 420,
                padding: [ 20, 20, 40, 60 ]
            });
            chart.source(this.spreadRepostDeepData, {
                percent: {
                    formatter: val => {
                        val = val + '%';
                        return val;
                    }
                }
            });
            chart.interval().position('item*percent');
            chart.render();
        }
    }
}
</script>

<style scoped>
.spread-wrapper {
    width: 100%;
    height: 64.5vh;
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
}

</style>
