<template>
  <!-- optional empty or wrapper div if needed -->
  <div></div>
</template>

<script setup>
</script>

<style>
.ga-fab {
    position: fixed;
    right: 20px; bottom: 20px;
    width: 56px; height: 56px; border-radius: 50%;
    border: none; cursor: pointer;
    background: var(--gold); color:#fff; font-size: 22px;
    box-shadow: 0 10px 30px rgba(0,0,0,.25);
    z-index: 9999;
}

.ga-panel {
    position: fixed; right: 20px; bottom: 88px;
    width: min(92vw, 380px); height: 560px; background:#fff;
    border-radius: 20px; overflow: hidden; z-index: 9999;
    box-shadow: 0 22px 60px rgba(0,0,0,.25);
}
</style>
