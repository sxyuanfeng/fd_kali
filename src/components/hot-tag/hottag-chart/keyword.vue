<template>
    <div class="hottag-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item style="font-size: 20px;">词云图</el-breadcrumb-item>
                </el-breadcrumb>
                <div id="hottag"></div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import DataSet from '@antv/data-set';
import { Chart, registerShape, Util } from '@antv/g2';
import { getHotTag } from '../../../api/hot-tag/index';

export default {
    data() {
        return {
            hottagData: [],
        }
    },
    created() {
        getHotTag().then(
            res => {
                this.hottagData = res;
            }
        )
    },
    watch: {
        'hottagData': function() {
            this.paintHottagChart();
        }
    },
    methods: {
        getTextAttrs(cfg) {
            //console.log(cfg);
            return {
                ...cfg.defaultStyle,
                ...cfg.style,
                fontSize: cfg.data.size,
                text: cfg.data.text,
                textAlign: 'center',
                fontFamily: cfg.data.font,
                fill: cfg.color || cfg.defaultStyle.stroke,
                textBaseline: 'Alphabetic'
            };
        },
        paintHottagChart() {
            // 给point注册一个词云的shape
            registerShape('point', 'cloud', {
                draw(cfg, container) {
                    const attrs = this.getTextAttrs(cfg);
                    const textShape = container.addShape('text', {
                        attrs: {
                            ...attrs,
                            x: cfg.x,
                            y: cfg.y
                        }
                    });
                    if (cfg.data.rotate) {
                        Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
                    }
                    return textShape;
                }
            });
            const dv = new DataSet.View().source(this.hottagData);
            const range = dv.range('value');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ';
            imageMask.onload = () => {
                dv.transform({
                    type: 'tag-cloud',
                    fields: ['name', 'value'],
                    imageMask,
                    font: 'Verdana',
                    size: [600, 400], // 宽高设置最好根据 imageMask 做调整
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
                        return ((d.value - min) / (max - min)) * (32 - 8) + 8;
                    }
                });
                let chart = new Chart({
                    container: 'hottag',
                    autoFit: false,
                    width: 600, // 宽高设置最好根据 imageMask 做调整
                    height: 400,
                    padding: 0
                });
                chart.data(dv.rows);
                chart.scale({
                    x: { nice: false },
                    y: { nice: false }
                });
                chart.legend(false);
                chart.axis(false);
                chart.tooltip({
                    showTitle: false,
                    showMarkers: false
                });
                chart.coordinate().reflect();
                chart.point()
                    .position('x*y')
                    .color('text')
                    .shape('cloud')
                    .state({
                    active: {
                        style: {
                            fillOpacity: 0.4
                        }
                    }
                    });
                chart.interaction('element-active');
                chart.render();
            };
        },
    }
}
</script>

<style scoped>
.hottag-wrapper {
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
