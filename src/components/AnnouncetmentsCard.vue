<script setup lang="ts">
import type { PropType } from "vue";
import { type Teacher } from "@/type";
import {type Announcement} from "@/type";

const props = defineProps({
  teacher: {
    type: Object as PropType<Teacher>,
    require: true,
  },
  announcement: {
    type: Object as PropType<Announcement>,
    require: true,
  },
});


</script>

<template>
  <article>
    <RouterLink :to="{
      name: 'announcement-detail',
      params: { announcementId: announcement?.id },
    }">
      <div class="max-w-sm rounded bg-[rgb(240,239,239)] overflow-hidden shadow-xl hover:shadow-xl w-80 hover:bg-[rgb(210,209,211)]">
        <div class="px-6 py-4">
          <div class="mb-2">
            <h2 class="text-xl font-bold text-gray-900 mb-3">{{ announcement?.title }}</h2>
            <div class="rounded-lg bg-[rgb(151,208,21)] py-1 px-2 text-xl text-white italic font-bold mb-3">DATA: {{ announcement?.date }}</div>

            <h2 class=" text-x  font-bold italic  text-gray-900 ">Clike the card to check details</h2>
          </div>
        </div>

      </div>
    </RouterLink>
  </article>
</template>

<style scoped></style>