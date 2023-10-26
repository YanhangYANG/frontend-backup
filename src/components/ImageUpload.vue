<!-- ImageUpload.vue -->
<template>
  <uploader
      :options="options"
      :file-status-text="statusText"
      class="uploader-example"
      ref="uploaderRef"
      @complete="complete"
  >
    <!-- ... -->
  </uploader>
</template>

<script setup lang="ts">
import {  ref } from 'vue';

interface Props {
  modelValue?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const convertStringToMedia = (str: string[]): any => {
  return str.map((element: string) => {
    return {
      name: element
    }
  })
}

const emit = defineEmits(['update:modelValue'])

const convertMediaToString = (media: any): string[] => {
  const output: string[] = []
  media.forEach((element: any) => {
    output.push(element.name)
  })
  return output
}

const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)

const complete = (files: any) => {
  emit('update:modelValue', convertMediaToString(files))
}

interface Props {
  modelValue?: string[]
}

const options = {
  target: 'http://localhost:8080/uploadFile',
  testChunks: false
};

const attrs = {
  accept: 'image/*'
}

const statusText = {
  success: 'success',
  error: 'error',
  uploading: 'uploading',
  paused: 'paused',
  waiting: 'waiting'
}

</script>

<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>