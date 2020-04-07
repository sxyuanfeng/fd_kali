<template>
    <div class="spread-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="chart-wrapper">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="vertical-bar">
                    <el-breadcrumb-item>
                        <font class="breadcrumb-name">粉丝量级分布</font>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="panel-box">
                    <div id="fan-measure"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    
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

</style>
