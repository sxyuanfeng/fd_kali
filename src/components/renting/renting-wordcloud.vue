<template>
    <div class="renting-wordcloud-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">租房信息词云</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="renting-wordcloud"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getRentingWordcloud } from '../../api/renting/index.js';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default {
    data() {
        return {
            rentingWordcloudData: [],
        }
    },
    created() {
        getRentingWordcloud({'city': this.$route.query.City}).then(
            res => {
                this.rentingWordcloudData = res.Data;
            }
        )
    },
    watch: {
        'rentingWordcloudData': function() {
            this.paintRentingWordcloud();
        }
    },
    methods: {
        paintRentingWordcloud() {
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
            const dv = new DataSet.View().source(this.rentingWordcloudData);
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
                    container: 'renting-wordcloud',
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
.renting-wordcloud-wrapper {
    width: 100%;
    height: 82.6vh;
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
