<script>
export default {
  onLaunch() {
    console.log('模拟人生启动')
  },
  onShow() {},
  onHide() {}
}
</script>

<template>
  <div id="app"></div>
</template>

<style>
page {
  background: #0a0a1a;
  min-height: 100vh;
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Global box model */
view, text, scroll-view, input {
  box-sizing: border-box;
}

/* Safe area */
.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Scrollbar hidden */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* Text ellipsis */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>