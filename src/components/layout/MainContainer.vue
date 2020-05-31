<template>
    <div class="main-container-cls">
        <top-container/>
        <content-container/>
    </div>
</template>

<script>
    import TopContainer from "./TopContainer";
    import ContentContainer from "./ContentContainer";

    export default {
        name: "MainContainer",
        components: {ContentContainer, TopContainer}
    }
</script>

<style scoped>
    .main-container-cls {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>