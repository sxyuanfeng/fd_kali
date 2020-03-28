<template>
    <div class="mblog-show-wrapper">
        <div class="mblog-content">
            <font class="text">{{ mblogData['text'] }}</font>
        </div>
        <div class="mblog-index">
            <span class="item">点赞数：{{ mblogData['attitude'] }}</span>
            <span class="item">评论数：{{ mblogData['comment'] }}</span>
            <span class="item">转发数：{{ mblogData['repost'] }}</span>
            <span class="item">发布时间：{{ formatDate(mblogData['time']) }}</span>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';

export default {
    props: {
        mblogData: {
            type: Object,
        }
    },
    methods: {
        formatDate(str) {
            return format(new Date(str), 'yyyy-MM-dd HH:mm:ss');
        }
    }
}
</script>

<style scoped>
.mblog-show-wrapper {
    margin: 10px 0 30px 0;
}

.mblog-content {
    text-align: left;
}

.mblog-index {
    margin: 5px 0 5px 0;
    text-align: left;
}

.item {
    width: 80px;
    margin: 5px 20px 5px 0;
    font-size: 14px;
    font-weight: 500;
    color: rgb(100, 98, 98);
}

.text {
    color: #ff873f;
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
}

</style>
