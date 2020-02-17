<template>
    <div class="account-chart-wrapper">
        <el-col :span="16">
            <el-card shadow="hover" class="account-chart-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="关注分析" name="first">
                        <follow></follow>
                    </el-tab-pane>
                    <el-tab-pane label="粉丝分析" name="second">
                        <fan></fan>
                    </el-tab-pane>
                    <el-tab-pane label="最近微博" name="third">最近微博</el-tab-pane>
                    <el-tab-pane label="真假粉丝" name="fourth">真假粉丝</el-tab-pane>
                </el-tabs>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import Follow from '../account-value/account-chart/follow';
import Fan from '../account-value/account-chart/fan';

export default {
    components: {
        Follow,
        Fan,
    },
    data() {
        return {
            activeName: 'first'
        }
    },
}
</script>

