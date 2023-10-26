<script setup lang="ts">
import type { Student } from "@/type";
import type{ Announcement } from "@/type";
import type { PropType } from "vue";

defineProps({
  announcement: {
    type: Object as PropType<Announcement>,
    require: true,
  },
});
</script>
<template>
  {{ announcement }}
  <div v-if="announcement"></div>
</template>