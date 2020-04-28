<template>
    <div class="covid-chart-wrapper">
        <el-scrollbar style="height: 100%">
            <el-card>
                <div class="chart-wrapper">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                        <el-breadcrumb-item>
                            <font class="breadcrumb-name">新冠肺炎讨论趋势</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <div id="covid-timeline"></div>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                        <el-breadcrumb-item>
                            <font class="breadcrumb-name">活跃发言人</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <div id="covid-active-user"></div>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                        <el-breadcrumb-item>
                            <font class="breadcrumb-name">世界疫情热点</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <iframe ref="covidoverseamap" frameborder="0" width="1100px" height="600px" srcdoc=""></iframe>
                    </div>
                </div>
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script>
import { getCovidTimeline, getCovidActiveUser, getCovidOverseaCountry } from '../../api/covid/index';
import G2 from '@antv/g2';

export default {
    data() {
        return {
            covidTimelineData: [],
            covidActiveUserData: [],
        }
    },
    created() {
        getCovidTimeline().then(
            res => {
                this.covidTimelineData = res.Data;
            }
        );
        getCovidActiveUser().then(
            res => {
                this.covidActiveUserData = res.Data;
            }
        );
        getCovidOverseaCountry().then(
            res => {
                this.$refs.covidoverseamap.srcdoc = res.Data;
            }
        )
    },
    watch: {
        'covidTimelineData': function() {
            this.paintCovidTimeline();
        },
        'covidActiveUserData': function() {
            this.paintCovidActiveUser();
        }
    },
    methods: {
        paintCovidTimeline() {
            let chart = new G2.Chart({
                container: 'covid-timeline',
                forceFit: true,
                height: 500,
                padding: [30, 60, 40, 50 ]
            });
            chart.source(this.covidTimelineData);
            chart.scale('value', {
                min: 0
            });
            chart.scale('time', {
                range: [ 0, 1 ]
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.line().position('time*value');
            chart.point().position('time*value')
            .size(4)
            .shape('circle')
            .style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        },
        paintCovidActiveUser() {
            const chart = new G2.Chart({
                container: 'covid-active-user',
                forceFit: true,
                height: 500,
                padding: [ 30, 30, 60, 50 ]
            });
            chart.source(this.covidActiveUserData);
            chart.scale('value', {
                tickInterval: 20
            });
            chart.interval().position('name*value');
            chart.render();
        }
    }
}
</script>

<style scoped>
.covid-chart-wrapper {
    width: 100%;
    height: 95.9vh;
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

</style>
