// src/components/MessageBubble/ButtonOptions.vue
<template>
  <div class="option-row">
    <button v-for="(opt,i) in options" :key="i" class="opt" @click="$emit('pick', opt)">{{ opt }}</button>
  </div>
</template>
<script setup>
const props = defineProps({ options: { type: Array, default: () => [] } })
</script>
<style scoped>
.option-row{display:flex;flex-wrap:wrap;gap:8px;}
.opt{border:1px solid #ddd;background:#fff;border-radius:999px;padding:6px 10px;cursor:pointer;}
.opt:hover{border-color:var(--gold);color:var(--gold);}
</style>
