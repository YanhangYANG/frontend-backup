<script setup lang="ts">
import { ref } from "vue";
import { type Announcement} from "@/type";
import AnnouncementService from "@/services/AnnouncementService";
import txt_icon_svg from "@/assets/txt.png";
import pdf_icon_svg from "@/assets/pdf.png";
import image_svg from "@/assets/image.png";

const props = defineProps({
  announcementId: String,
});

const announcement = ref<Announcement | null>(null);

AnnouncementService.getAnnouncementById(String(props.announcementId))
    .then((teacherResponse) => {
      // 直接将数据赋值给teacher.value，而不是将其视为数组
      announcement.value = teacherResponse.data as Announcement;
      console.log(announcement.value);
    })
    .catch((error) => {
      console.log(error);
    });

function getFileIcon(fileUrl: string) {
  try {
    const decodedUrl = decodeURIComponent(fileUrl);
    const url = new URL(decodedUrl);
    const filename = url.pathname.split('/').pop();
    const extension = filename?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return pdf_icon_svg
      case 'txt':
        return txt_icon_svg
      case 'png':
      case 'jpg':
      case 'jpeg':
        return image_svg
      default:
        return 'path_to_default_icon.svg';
    }
  } catch (e) {
    console.error('Failed to parse file URL:', e);
    return 'path_to_default_icon.svg';  // 返回默认图标如果解析失败
  }
}
function downloadFile(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.split('/').pop() || 'downloaded-file';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getFileName(url: string): string {
  return url.split('/').pop() || 'Unknown file';
}

function getOriginalFileName(url: string): string {
  // 提取URL路径的最后一部分
  const lastPart = url.split('/').pop() || '';
  // 将URL解码为人类可读的字符串
  const decoded = decodeURIComponent(lastPart);
  // 使用正则表达式匹配文件名
  const match = decoded.match(/\d+-\d+-\d+\s\d+-([^?]+)/);
  // 如果找到匹配项，则返回文件名，否则返回未知文件
  return match ? match[1] : 'Unknown file';
}


</script>

<template>

  <main class="container w-full relative flex min-h-screen flex-col justify-center overflow-hidden bg-white py-4 sm:py-12 ">


    <div class="  bg-gray-50 rounded-lg p-5 m-4 shadow-xl ring-1 ring-gray-900/5 ">

      <h2 class="text-center text-6xl font-semibold mt-3">{{ announcement?.title }} </h2>
      <hr class="border-gray-400 w-auto">
      <h2 class="text-left text-2xl font-semibold mt-3">{{ announcement?.content }}</h2>
      <div class="flex justify-center mt-5">
        <div class="flex flex-col items-center">
          <div class="mt-5">
            <h3 class="text-center text-xl font-semibold">Attached Files:</h3>
            <div class="flex flex-wrap">
              <div v-for="(file, index) in announcement?.files" :key="index" class="m-2 text-center">
                <div class="icon-container" @click="downloadFile(file)">
                  <img :src="getFileIcon(file)" alt="" class="icon-size"/>
                </div>
                <div class="file-name">
                  {{ getOriginalFileName(file) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-center text-2xl">      </h2>
      </div>
      <div class="mt-5">


        <hr class="border-gray-400 w-auto">

        <a href="/Announcements"
           class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[rgb(151,208,21)] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
      <span
          class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[rgb(151,208,21)] group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Back to AnnouncementPage </span>
        </a>
      </div>
    </div>

  </main>



</template>

<style scoped>
.icon-container {
  cursor: pointer;
  transition: transform 0.3s;
}

.icon-container:hover {
  transform: scale(1.1);
}

.icon-size {
  width: 50px;
  height: 50px;
}

.file-name {
  margin-top: 8px;
}
</style>