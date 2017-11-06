<template lang="html">
<div id="hotelbaseEditPolicy">
    <HotelPolicyPage></HotelPolicyPage>
</div>
</template>
<script>
const HotelPolicyPage = () =>
    import ('../hotel-policy/hotel-policy.vue')
export default {
    components: {
        HotelPolicyPage
    },
    data() {
        return {
            id: '',
            hotelName: '',
            isEditable: true
        }
    },
    mounted() {
        const _self = this
        _self.id = _self.$route.params.ID
        _self.hotelName = _self.$route.query.name
    },
    methods: {}
}
</script>
<style lang="scss">
#hotelbaseEditPolicy>.el-collapse {
    border: 0;
}
</style>
