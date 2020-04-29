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
                            <font class="breadcrumb-name">世界疫情地图</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <iframe ref="covidoverseamap" frameborder="0" width="1100px" height="600px" srcdoc=""></iframe>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                        <el-breadcrumb-item>
                            <font class="breadcrumb-name">世界疫情热点</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <div id="covid-oversea-hot"></div>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                        <el-breadcrumb-item>
                            <font class="breadcrumb-name">武汉疫情热点</font>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="panel-box">
                        <div id="covid-wuhan-hot"></div>
                    </div>
                </div>
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script>
import { getCovidTimeline, getCovidActiveUser, getCovidOverseaCountry, getCovidWuhanHot, getCovidOverseaHot } from '../../api/covid/index';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default {
    data() {
        return {
            covidTimelineData: [],
            covidActiveUserData: [],
            covidWuhanHotData: [],
            covidOverseaHotData: [],
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
        );
        getCovidWuhanHot().then(
            res => {
                this.covidWuhanHotData = res.Data;
            }
        );
        getCovidOverseaHot().then(
            res => {
                this.covidOverseaHotData = res.Data;
            }
        )
    },
    watch: {
        'covidTimelineData': function() {
            this.paintCovidTimeline();
        },
        'covidActiveUserData': function() {
            this.paintCovidActiveUser();
        },
        'covidWuhanHotData': function() {
            this.paintCovidWuhanHot();
        },
        'covidOverseaHotData': function() {
            this.paintCovidOverseaHot();
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
        },
        paintCovidOverseaHot() {
            function getTextAttrs(cfg) {
                return {
                    ...cfg.style,
                    fillOpacity: cfg.opacity,
                    fontSize: cfg.origin._origin.size,
                    rotate: cfg.origin._origin.rotate,
                    text: cfg.origin._origin.text,
                    textAlign: 'center',
                    fontFamily: cfg.origin._origin.font,
                    fill: cfg.color,
                    textBaseline: 'Alphabetic'
                };
            }
            // 给point注册一个词云的shape
            G2.Shape.registerShape('point', 'cloud', {
                drawShape(cfg, container) {
                    const attrs = getTextAttrs(cfg);
                    return container.addShape('text', {
                    attrs: {
                        ...attrs,
                        x: cfg.x,
                        y: cfg.y
                    }
                    });
                }
            });
            const dv = new DataSet.View().source(this.covidOverseaHotData);
            const range = dv.range('value');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = require('../../assets/love.png');
            imageMask.onload = () => {
                dv.transform({
                    type: 'tag-cloud',
                    fields: [ 'name', 'value' ],
                    imageMask,
                    font: 'Verdana',
                    size: [ 600, 400 ], // 宽高设置最好根据 imageMask 做调整
                    padding: 0,
                    timeInterval: 5000, // max execute time
                    rotate() {
                        let random = ~~(Math.random() * 4) % 4;
                        if (random === 2) {
                            random = 0;
                        }
                        return random * 90; // 0, 90, 270
                    },
                    fontSize(d) {
                        return ((d.value - min) / (max - min)) * (32 - 8) + 18;
                    }
                });
                let chart = new G2.Chart({
                    container: 'covid-oversea-hot',
                    width: 1000, // 宽高设置最好根据 imageMask 做调整
                    height: 500,
                    padding: 0
                });
                chart.source(dv, {
                    x: { nice: false },
                    y: { nice: false }
                });
                chart.legend(false);
                chart.axis(false);
                chart.tooltip({
                    showTitle: false
                });
                chart.coord().reflect();
                chart.point()
                    .position('x*y')
                    .color('text')
                    .shape('cloud');
                chart.render();
            }
        },
        paintCovidWuhanHot() {
            function getTextAttrs(cfg) {
                return {
                    ...cfg.style,
                    fillOpacity: cfg.opacity,
                    fontSize: cfg.origin._origin.size,
                    rotate: cfg.origin._origin.rotate,
                    text: cfg.origin._origin.text,
                    textAlign: 'center',
                    fontFamily: cfg.origin._origin.font,
                    fill: cfg.color,
                    textBaseline: 'Alphabetic'
                };
            }
            // 给point注册一个词云的shape
            G2.Shape.registerShape('point', 'cloud', {
                drawShape(cfg, container) {
                    const attrs = getTextAttrs(cfg);
                    return container.addShape('text', {
                    attrs: {
                        ...attrs,
                        x: cfg.x,
                        y: cfg.y
                    }
                    });
                }
            });
            const dv = new DataSet.View().source(this.covidWuhanHotData);
            const range = dv.range('value');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = require('../../assets/love.png');
            imageMask.onload = () => {
                dv.transform({
                    type: 'tag-cloud',
                    fields: [ 'name', 'value' ],
                    imageMask,
                    font: 'Verdana',
                    size: [ 600, 400 ], // 宽高设置最好根据 imageMask 做调整
                    padding: 0,
                    timeInterval: 5000, // max execute time
                    rotate() {
                        let random = ~~(Math.random() * 4) % 4;
                        if (random === 2) {
                            random = 0;
                        }
                        return random * 90; // 0, 90, 270
                    },
                    fontSize(d) {
                        return ((d.value - min) / (max - min)) * (32 - 8) + 18;
                    }
                });
                let chart = new G2.Chart({
                    container: 'covid-wuhan-hot',
                    width: 1000, // 宽高设置最好根据 imageMask 做调整
                    height: 500,
                    padding: 0
                });
                chart.source(dv, {
                    x: { nice: false },
                    y: { nice: false }
                });
                chart.legend(false);
                chart.axis(false);
                chart.tooltip({
                    showTitle: false
                });
                chart.coord().reflect();
                chart.point()
                    .position('x*y')
                    .color('text')
                    .shape('cloud');
                chart.render();
            }
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
