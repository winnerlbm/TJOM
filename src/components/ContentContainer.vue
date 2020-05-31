<template>
    <div class="content-container-cls">
        <map-container/>
    </div>
</template>

<script>
    import MapContainer from "./MapContainer";

    export default {
        name: "ContentContainer",
        components: {MapContainer}
    }
</script>

<style scoped>
    .content-container-cls {
        flex: 1;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        overflow: hidden;
    }
</style>