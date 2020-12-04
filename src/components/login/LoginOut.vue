<template>
  <div class="enum_config">
    <iframe
      :src="url"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script>
    import appCfg from "@config/AppCfg"
    export default {
        data() {
            return {
              url: ''
            }
        },
        mounted() {
          this.url = appCfg.map.loginUrl+":9007/cas/logout?service="+appCfg.map.gisWebUrl;
          window.location.href = this.url;
          console.log("第三方登录！")
        }
    };
</script>

<style lang="scss" scoped>
.enum_config {
  height: 100%;
  width: 100%;
}
</style>
