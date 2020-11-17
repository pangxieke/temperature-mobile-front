<template>
  <div id="app" class="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'fade'
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth === fromDepth) {
        this.transitionName = 'fade'
      } else {
        this.transitionName = toDepth > fromDepth ? 'forward' : 'reverse'
      }
    }
  }
}
</script>

<style lang="less">
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 11;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.forward-enter,
.reverse-leave-active {
  transform: translate3d(100%, 0, 0);
}

.forward-leave-active,
.reverse-enter {
  transform: translate3d(-100%, 0, 0);
}
</style>
