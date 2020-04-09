<template>
    <div class="overview-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">综合评价</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box flex">
                    <div class="circle-progress-wrapper">
                        <el-progress type="circle" color="rgb(103,194,58)" :percentage="spreadOverviewData['综合评分']" stroke-width="13" :format="circleFormat"></el-progress>
                        <font style="color: darkgray; margin-top: 10px;">综合评分</font>
                    </div>
                    <div class="progress-flex line-progress-wrapper">
                        <div class="line-progress">
                            <font class="progress-font">用户质量</font>
                            <el-progress :percentage="spreadOverviewData['用户质量']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">真实用户</font>
                            <el-progress :percentage="spreadOverviewData['真实用户']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                        <div class="line-progress">
                            <font class="progress-font">加V</font>
                            <el-progress :percentage="spreadOverviewData['加V']" color="rgb(103,194,58)" stroke-width="13" class="progress-flex line-progress" :format="lineFormat"></el-progress>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">留言词云</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="repost-wordcloud"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getSpreadOverview, getRepostWordcloud } from '../../../api/mblog/index';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default {
    data() {
        return {
            spreadOverviewData: {},
            repostWordcloudData: [],
        }
    },
    created() {
        getSpreadOverview({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.spreadOverviewData = res.Data;
                }
            }
        );
        getRepostWordcloud({'mid': this.$route.query.BlogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.repostWordcloudData = res.Data;
                }
            }
        )
    },
    watch: {
        'repostWordcloudData': function() {
            this.paintRepostWordcloud();
        }
    },
    methods: {
        circleFormat(percentage) {
            return percentage + '分';
        },
        lineFormat(percentage) {
            return percentage + '/100';
        },
        paintRepostWordcloud() {
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
            const dv = new DataSet.View().source(this.repostWordcloudData);
            const range = dv.range('value');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = require('../../../assets/love.png');
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
                    container: 'repost-wordcloud',
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
};

</script>

<style scoped>
.overview-wrapper {
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

.circle-progress-wrapper {
    margin: 20px;
    padding-right: 20px;
    border-right: darkgray 1px solid;
    display: flex;
    flex-direction: column;
}

.line-progress-wrapper {
    margin-top: 60px;
}

.line-progress {
    display: flex;
    flex-direction: row;
    margin: 5px 0 5px 0;
}

.progress-flex {
    flex: 1;
}

.progress-font {
    color: gray;
    font-size: 14px;
    margin-right: 8px;
    width: 100px;
    text-align: right;
}

.line-progress {
    margin-top: 1px;
}

</style>
