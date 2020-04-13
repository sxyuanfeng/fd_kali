<template>
    <div class="renting-item-wrapper">
        <el-card shadow="hover">
            <div style="width: 80%; margin: 0 auto;">
                <div class="flex">
                    <el-avatar :size="40" :src="showData['avatar']"></el-avatar>
                    <div class="name">
                        <a :href="showData['profile']" target="_blank" style="text-decoration:none;color: black; text-align: left;">
                            <div style="margin-top: 3px;">
                                <font style="font-weight: 600;">{{ showData['name'] }}</font>&nbsp;
                                <el-tag type="warning" size="mini">
                                    <i class="el-icon-medal" style="font-weight: 600"></i>{{ showData['rank'] }}
                                </el-tag>
                            </div>
                        </a>
                        <font style="font-weight: 100; font-size: 12px; text-align: left;">{{ showData['time'] | timeFilter }}</font>
                    </div>
                </div>
                <a :href="showData['scheme']" target="_blank" style="text-decoration:none;color: black;">
                    <div v-html="showData['text']" class="html-content"></div>
                </a>
                <div style="text-align: left;">
                    <el-image style="width: 120px; height: 120px; margin: 3px;" v-for="(item, index) in showData['pics']" :key="index" :src="item" :preview-src-list="showData['pics']"></el-image>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { format } from 'date-fns';

export default {
    props: {
        showData: {},
    },
    filters: {
        timeFilter(val) {
            return format(new Date(val), 'yyyy-MM-dd HH:mm:ss');
        }
    }
}
</script>

<style scoped>
.renting-item-wrapper {
    margin: 0 0 10px 0;
}

.flex {
    display: flex;
}

.name {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 5px;
}

.html-content {
    width: 400px;
    margin: 10px 0 10px 0;
    text-align: left;
    line-height: 1;
}
</style>
