<template>
    <div class="account-value-search-wrapper">
        <div style="margin: 200px 200px 0 200px;">
            <el-input placeholder="请输入博主的mid" v-model="accountMid">
                <el-button @click="handleGoAccountValue" slot="append" icon="el-icon-search" style="background: #ff873f; color: #fff; border-radius: 0 3px 3px 0">搜索</el-button>
            </el-input>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            accountMid: '',
        }
    },
    methods: {
        handleGoAccountValue() {
            if (parseInt(this.accountMid)) {
                this.$router.push({
                    path: '/accountvalue',
                    query: {
                        AccountMid: parseInt(this.accountMid),
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
.account-value-search-wrapper {
    height: calc(100vh - 80px);
    background: #F8F9F9;
    padding: 15px;
}
</style>
