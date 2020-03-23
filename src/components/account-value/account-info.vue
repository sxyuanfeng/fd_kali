<template>
    <div class="account-info-wrapper">
        <el-col :span="8">
            <el-card shadow="hover" class="account-info-card">
                <div class="base-info">
                    <div style="display: flex">
                        <el-avatar :size="65" :src="baseInfo.master_avatar"></el-avatar>
                        <div class="base-info-name">
                            <a :href="baseInfo.master_profile_url" target="_blank" style="text-decoration:none;color: black;">
                                <span style="font-weight: 600">{{ baseInfo.master_name }}</span>
                            </a>&nbsp;
                            <i v-if="baseInfo.master_gender === 'm'" class="el-icon-male" style="color: #409EFF; font-weight: 600;"></i>
                            <i v-else class="el-icon-female" style="color: #EC7063; font-weight: 600; transform:rotate(45deg);"></i>
                            <div class="base-info-rank">
                                <el-tag type="warning" size="mini">
                                    <i class="el-icon-medal" style="font-weight: 600"></i>{{ baseInfo.master_urank }}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: left; margin-top: 20px; font-size: 14px; color: #2C3E50;">简介：{{ baseInfo.master_desc }}</div>
                </div>
                <el-divider><i class="el-icon-data-analysis"></i></el-divider>
                <div class="base-exponent">
                    <div style="display: flex; flex-direction: column; width: 33%;">
                        <span class="exponent-name">关注数</span>
                        <span class="exponent-value">{{ baseInfo.master_follow_count }}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; width: 33%;">
                        <span class="exponent-name">粉丝数</span>
                        <span class="exponent-value">{{ baseInfo.master_fans_count }}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; width: 33%;">
                        <span class="exponent-name">微博数</span>
                        <span class="exponent-value">{{ baseInfo.master_statuses_count }}</span>
                    </div>
                </div>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import { getMasterBaseInfo } from '../../api/account-value/index';

export default {
    props: {
        accountMid: {
            type: Number,
        },
    },
    data() {
        return {
            baseInfo: {},
        }
    },
    created() {
        getMasterBaseInfo({'master_id': this.accountMid}).then(res => {
            if (res.Code === 1) {
                this.baseInfo = res.Data;
            } else {
                this.$bus.$emit('setAccountValueLoading');
            }
        })
    }
}
</script>

<style scoped>
.base-info {
    display: flex;
    flex-direction: column;
}

.base-info-name {
    margin: 10px 20px;
}

.base-info-rank {
    margin-top: 5px;
    text-align: left;
}

.base-exponent {
    display: flex;
    justify-content: space-between;
}

.exponent-name {
    margin-bottom: 10px;
    font-size: 12px;
    color:darkgray;
}

.exponent-value {
    font-weight: 500;
}
</style>