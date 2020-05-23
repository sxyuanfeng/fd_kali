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
                        <div class="panel-box flex" style="padding: 20px; ">
                            <div style="border-right: 1px solid darkgray;">
                                <div class="flex">
                                    <el-avatar :size="65" :src="spreadRepostKeyuserData['avatar']"></el-avatar>
                                    <div style="margin: 7px ">
                                        <div class="author-name">{{ spreadRepostKeyuserData['name'] }}</div>
                                        <div style="margin-top: 5px;">
                                            <span>粉丝数：{{ spreadRepostKeyuserData['followers_count'] }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex" style="margin-top: 10px;">
                                    <div class="box">
                                        <div>转发时间</div>
                                        <div style="margin-top: 5px;">
                                            {{ spreadRepostKeyuserData['created_at'] }}
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div>转发数</div>
                                        <div style="margin-top: 5px;">
                                            {{ spreadRepostKeyuserData['reposts_count'] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="padding-left: 30px; width: 270px; text-align: left;">
                                <span style="color: #d7e02b; font-size: 13px;">转发内容: </span>
                                <span style="font-size: 13px;">{{ spreadRepostKeyuserData['raw_text'] }}</span>
                            </div>
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
                        <div class="panel-box" style="padding: 52px 0px 52px 0px;">
                            <el-steps align-center>
                                <el-step v-for="(item, index) in spreadRepostKeyuserRoadData" :key="index">
                                    <template slot="title">
                                        <font color="#2ECC71">{{ item }}</font>
                                    </template>
                                    <template slot="icon">
                                        <i class="el-icon-user"></i>
                                    </template>
                                </el-step>
                            </el-steps>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">引爆点</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div class="boom-wrapper">
                        <reposter-right :showData="spreadRepostBoomData[0]" top="-70px" right="80px"></reposter-right>
                        <reposter-right :showData="spreadRepostBoomData[1]" top="20px" right="-60px"></reposter-right>
                        <reposter-right :showData="spreadRepostBoomData[2]" top="120px" right="-85px"></reposter-right>
                        <reposter-right :showData="spreadRepostBoomData[3]" top="220px" right="-45px"></reposter-right>
                        <reposter-right :showData="spreadRepostBoomData[4]" top="310px" right="90px"></reposter-right>
                        <reposter-left :showData="spreadRepostBoomData[9]" top="-70px" left="80px"></reposter-left>
                        <reposter-left :showData="spreadRepostBoomData[8]" top="20px" left="-50px"></reposter-left>
                        <reposter-left :showData="spreadRepostBoomData[7]" top="120px" left="-85px"></reposter-left>
                        <reposter-left :showData="spreadRepostBoomData[6]" top="220px" left="-50px"></reposter-left>
                        <reposter-left :showData="spreadRepostBoomData[5]" top="310px" left="70px"></reposter-left>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getSpreadTimeline, getSpreadRepostRelative, getSpreadRepostDeep, getSpreadRepostKeyuser, getSpreadRepostKeyuserRoad, getSpreadRepostBoom } from '../../../api/mblog/index';
import G2 from '@antv/g2';
import ReposterRight from '../../reposter-right';
import ReposterLeft from '../../reposter-left';

export default {
    components: {
        ReposterRight,
        ReposterLeft,
    },
    data() {
        return {
            spreadTimelineData: [],
            spreadRepostDeepData: [],
            spreadRepostKeyuserData: {},
            spreadRepostKeyuserRoadData: [],
            spreadRepostBoomData: [],
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
        );
        getSpreadRepostKeyuserRoad({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadRepostKeyuserRoadData = res.Data;
                }
            }
        );
        getSpreadRepostBoom({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadRepostBoomData = res.Data;
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
    height: 100vh;
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

.box {
    background: #d7e02b;
    padding: 5px;
    margin-right: 10px;
}

.author-name {
    text-align: left;
    color: #00e5ff;
}
.boom-wrapper {
    background: url('./ybdbg.png');
    background-size: 350px 300px;
    background-repeat: no-repeat;
    background-position: top center;
    width: 539px;
    height: 600px;
    margin: 0px auto;
    position: relative;
    top: 150px;
}

</style>
