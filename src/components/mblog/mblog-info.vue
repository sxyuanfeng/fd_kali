<template>
    <div class="mblog-info-wrapper">
        <el-card>
            <div class="flex">
                <div class="mblog-author-wrapper">
                    <el-avatar :size="65" :src="mblogInfo['avatar']"></el-avatar>
                    <div style="margin: 7px">
                        <div class="author-name">{{ mblogInfo['author'] }}</div>
                        <ul>
                            <li class="border">
                                <span>{{ mblogInfo['follow_count'] }}</span>
                                <span>关注</span>
                            </li>
                            <li class="border">
                                <span>{{ mblogInfo['followers_count'] }}</span>
                                <span>粉丝</span>
                            </li>
                            <li>
                                <span>{{ mblogInfo['statuses_count'] }}</span>
                                <span>微博</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mblog-content-wrapper">
                    <div class="html-content" v-html="mblogInfo['text']"></div>
                    <div style="margin-top: 5px;">
                        <span class="space size">{{ mblogInfo['created_at'] }} | {{ mblogInfo['phone'] }}</span>
                        <span class="size">转发({{ mblogInfo['reposts'] }}) | </span>
                        <span class="size">评论({{ mblogInfo['comments']}}) | </span>
                        <span class="size">点赞({{ mblogInfo['attitudes'] }})</span>
                        <span style="font-size: 13px; margin-left: 100px; color:darkgray;">更新时间：{{ mblogInfo['current_time'] }}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getMblogInfo } from '../../api/mblog/index';
import { format } from 'date-fns';

export default {
    props: {
        blogMid: {
            type: Number,
        },
    },
    data() {
        return {
            mblogInfo: {},
        }
    },
    created() {
        getMblogInfo({'mid': this.blogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.mblogInfo = res.Data;
                    this.mblogInfo['created_at'] = format(new Date(this.mblogInfo['created_at']), 'yyyy-MM-dd HH:mm:ss');
                } else {
                    this.$bus.$emit('setMblogLoading');
                }
            }
        )
    }
}
</script>

<style scoped>
.mblog-info-wrapper {
    margin-bottom: 20px;
}

.flex {
    display: flex;
}

.mblog-author-wrapper {
    display: flex;
}

.mblog-content-wrapper {
    margin-left: 100px;
}

.author-name {
    text-align: left;
    color: #00e5ff;
}

ul {
    list-style: none;
    float: left;
    text-align: left;
    display: block;
    margin-top: 5px;
}

li {
    display: list-item;
    float: left;
    width: 80px;
}

li span {
    float: left;
    width: 100%;
}

.border {
    margin-right: 10px;
    border-right: 1px solid darkgray;
}

.html-content {
    width: 800px;
    text-align: left;
    height: 48px;
    line-height: 1;
    text-indent: 2em;
    overflow: hidden;
}

.space {
    margin-right: 10px;
}

.size {
    font-size: 13px;
    color: #00e5ff;
}

</style>
