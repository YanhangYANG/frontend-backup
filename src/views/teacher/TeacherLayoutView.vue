<script setup lang="ts">
import { ref } from "vue";
import { type Teacher } from "@/type";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();


import TeacherService from "@/services/TeacherService";

const props = defineProps({
  teacherId: String,
});

const teacher = ref<Teacher | null>(null);

TeacherService.getTeacherById(String(props.teacherId))
    .then((teacherResponse) => {
      // 直接将数据赋值给teacher.value，而不是将其视为数组
      teacher.value = teacherResponse.data as Teacher;
      console.log(teacher.value);
    })
    .catch((error) => {
      console.log(error);
    });

</script>

<template>
 
  <main class="container w-full relative flex min-h-screen flex-col justify-center overflow-hidden bg-white py-4 sm:py-12 ">
    
    
      <div class="  bg-gray-50 rounded-lg p-5 m-4 shadow-xl ring-1 ring-gray-900/5 ">
        <img class="w-48 h-48 rounded-full mx-auto object-cover" :src="teacher?.images[0]" alt="Profile picture">
        <h2 class="text-center text-2xl font-semibold mt-3">{{ teacher?.firstname }} {{ teacher?.surname }}</h2>
        <h2 class="text-center text-2xl font-semibold mt-3">{{ teacher?.id }}</h2>
        <p class="text-right text-2xl text-gray-600 mt-1">{{teacher?.department}} department</p>
        <div class="flex justify-center mt-5">
          <h2 class="text-center text-2xl">Position:{{ teacher?.academicPosition}}</h2>

        </div>
        <h2 class="text-center text-2xl"> advisee:     </h2>
        <div class="flex justify-center mt-5">

          <div class="flex flex-col items-center">
            <div v-for="(advisee, index) in teacher?.advisee" :key="index" class="text-center mb-2">
              <RouterLink :to="{
                 name: 'student-layout',
                 params: { studentId: advisee.id },
                 }">
              <img class="w-10 h-10 rounded-2xl mx-auto object-cover" :src="advisee.images[0]" alt="Profile picture">
              {{ advisee.firstname }} {{advisee.surname}}
</RouterLink>
            </div>
          </div>


          <h2 class="text-center text-2xl">      </h2>
        </div>
        <div class="flex justify-between" v-if="authStore.isAdmin || authStore.isFastFit" >
          <!-- 第一个按钮 -->
          <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-purple-600 hover:bg-purple-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
            <span class="mr-2">Edit</span>
            <!-- SVG 省略 -->
          </button>

          <!-- 第二个按钮 -->
          <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
            <span class="mr-2">Save</span>
            <!-- SVG 省略 -->
          </button>
        </div>
        <div class="mt-5">


          <hr class="border-gray-400 w-auto">
          
          <a href="/teacher"
      class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[rgb(158,118,180)] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
      <span
        class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[rgb(158,118,180)] group-hover:h-full"></span>
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
      <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Back to TeacherPage</span>
    </a>
        </div>
      </div>
     
  </main>
 


</template>

