<template>
  <div class="not-found">
    <h3>404</h3>
    <p>您访问的页面不存在</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="less">
.not-found {
  h3,
  p {
    color: #333333;
    text-align: center;
  }

  p {
    color: #999999;
  }
}
</style>
