<template>
    <div class="renting-out-list-wrapper">
        <el-scrollbar style="height: 100%">
            <div class="renting-list-wrapper">
                <renting-item v-for="(item, index) in outListData" :key="index" :showData="item"></renting-item>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import RentingItem from './renting-item';
import { getRentingOutList } from '../../api/renting/index';

export default {
    components: {
        RentingItem,
    },
    data() {
        return {
            outListData: [],
        }
    },
    created() {
        getRentingOutList({'city': this.$route.query.City}).then(
            res => {
                if (res.Code === 1) {
                    this.outListData = res.Data;
                }
            }
        )
    }
}
</script>

<style scoped>
.renting-out-list-wrapper {
    width: 100%;
    height: 82.6vh;
}

.renting-list-wrapper {
    width: 550px;
    margin: 5px auto;
}
</style>
