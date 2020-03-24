<template>
    <div class="repost-card-wrapper">
        <el-card shadow="never">
        </el-card>
    </div>
</template>

<script>
import { getRepostCard } from '../../api/repost/index';

export default {
    props: {
        blogMid: {
            type: Number,
        }
    },
    data() {
        return {
            cardData: {}
        }
    },
    created() {
        getRepostCard({'mid': this.blogMid}).then(
            res => {
                if (res.Code === 1) {
                    this.cardData = res.Data;
                    console.log(this.cardData);
                }
            }
        );
    }
}
</script>

<style scoped>
.repost-card-wrapper {
    margin: 30px 30px 30px 30px;
}
</style>
