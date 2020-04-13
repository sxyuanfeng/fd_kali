<template>
    <div class="renting-wrapper">
        <renting-wrap :city="city"></renting-wrap>
    </div>
</template>

<script>
import RentingWrap from '../components/renting/renting-wrap';

export default {
    components: {
        RentingWrap,
    },
    data() {
        return {
            city: this.$route.query.City,
        }
    }
}
</script>

<style scoped>
.renting-wrapper {
    background: #F8F9F9;
    padding: 15px;
}

</style>
