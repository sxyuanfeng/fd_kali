<template>
    <div class="reposter-right-wrapper" :style="{'top': top, 'right': right}">
        <el-card shadow="hover" :body-style="{padding: '3px'}">
            <div class="flex">
                <el-avatar :size="60" :src="showData['avatar']"></el-avatar>
                <div style="margin: 4px 0 0 3px ">
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
        right: {
            type: String,
        },
    }
}
</script>

<style scoped>
.reposter-right-wrapper {
    position: absolute;
}

.flex {
    display: flex;
}

.author-name {
    text-align: left;
    color: #ff873f;
    font-size: 14px;
}

.size {
    font-size: 10px;
}

.align {
    text-align: left;
}
</style>
