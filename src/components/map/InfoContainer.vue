<template>
    <div class="info-container-cls">
       <div style="flex: 1; margin: 10px">
           <span style="color: #FFFFFF;font-size: 0.5rem">统计图及基础信息分布区</span>
       </div>
    </div>
</template>

<script>
    export default {
        name: "InfoContainer",
        data(){
            return {
                treeList:[

                ]
            }
        },
        props:{
            map : Object
        },
        methods: {

        }
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