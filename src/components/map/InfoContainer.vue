<template>
    <div class="info-container-cls">
       <div style="flex: 1; margin: 10px">
           <span style="color: #FFFFFF;font-size: 0.5rem">Hello world</span>
       </div>
    </div>
</template>

<script>
    export default {
        name: "InfoContainer"
    }
</script>

<style scoped>
    .info-container-cls {
        width: 10rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background-color: rgba(27, 27, 27, 0.5);
    }
</style>