<template>
    <div class="reposter-left-wrapper" :style="{'top': top, 'left': left}">
        <el-card shadow="hover" :body-style="{padding: '3px'}">
            <div class="flex">
                <div style="margin: 4px 3px 0 0 ">
                    <div class="author-name">{{ showData['name'] }}</div>
                    <div class="size align" style="margin-top: 5px;">
                        <span>粉丝：{{ showData['followers_count'] }}</span>
                    </div>
                    <div class="size align" style="margin-top: 2px;">
                        <span>二次转发：{{ showData['reposts_count'] }}</span>
                    </div>
                    <div class="size align" style="margin-top: 2px;">
                        <span>转发时间：{{ showData['created_at'] }}</span>
                    </div>
                </div>
                <el-avatar :size="60" :src="showData['avatar']"></el-avatar>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        showData: {
            type: Object,
        },
        top: {
            type: String,
        },
        left: {
            type: String,
        },
    }
}
</script>

<style scoped>
.reposter-left-wrapper {
    position: absolute;
}

.flex {
    display: flex;
}

.author-name {
    text-align: right;
    color: #ff873f;
    font-size: 14px;
}

.size {
    font-size: 10px;
}

.align {
    text-align: right;
}
</style>