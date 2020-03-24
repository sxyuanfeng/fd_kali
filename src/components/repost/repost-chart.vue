<template>
    <div class="repost-chart-wrapper">
        <el-col :span="24">
            <el-card shadow="hover" class="account-chart-card">
                <el-scrollbar style="height: 100%">
                    <div class="chart-wrapper">
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                            <el-breadcrumb-item style="font-size: 20px;">微博转发关系图</el-breadcrumb-item>
                        </el-breadcrumb>
                        <repost-card :blogMid="blogMid"></repost-card>
                        <iframe ref="repostchart" frameborder="0" width="1000px" height="600px" srcdoc="<p>微博转发关系图</p>"></iframe>
                    </div>
                </el-scrollbar>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import { getRepostChart } from '../../api/repost/index';
import RepostCard from './repost-card';

export default {
    components: {
        RepostCard,
    },
    props: {
        blogMid: {
            type: Number,
        }
    },
    created() {
        getRepostChart({'mid': this.blogMid}).then(
            res => {
                if (res.Code ===1) {
                    this.$refs.repostchart.srcdoc = res.Data;
                } else {
                    this.$bus.$emit('setRepostLoading');
                }
                
            }
        );
    }
}
</script>

<style scoped>
.repost-chart-wrapper {
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
