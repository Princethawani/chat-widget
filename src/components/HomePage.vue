<template>
  <Outer-Homesection @navigate="$emit('navigate', $event)" />
</template>
<script setup>
import OuterHomesection from './Outer/Homesection.vue'

</script>
