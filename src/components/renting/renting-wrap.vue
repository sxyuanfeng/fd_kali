<template>
    <div class="renting-wrap-wrapper">
        <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="租房信息展示" name="rentinghuntinglist"></el-tab-pane>
                <!--
                <el-tab-pane label="出租" name="rentingoutlist"></el-tab-pane>
                -->
                <el-tab-pane label="城市租房分析" name="rentingwordcloud"></el-tab-pane>
                <router-view></router-view>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        city: {
            type: String,
        },
    },
    data() {
        return {
            activeName: 'rentinghuntinglist',
            tabRoute: {
                'rentinghuntinglist': '/renting/rentinghuntinglist',
                'rentingoutlist': '/renting/rentingoutlist',
                'rentingwordcloud': '/renting/rentingwordcloud',
            }
        }
    },
    created() {
        this.$router.replace({
            path: '/renting/rentinghuntinglist',
            query: {
                    City: this.city,
                }
            });
    },
    methods: {
        handleClick(v) {
            this.$router.push({
                path: this.tabRoute[v.name],
                query: {
                        City: this.city,
                    }
                });
        }
    }
}
</script>

<style scoped>
.renting-wrap-wrapper {

}
</style>
