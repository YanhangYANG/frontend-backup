<template>
  
   
    <div >
      <h1 class=" flex  justify-left text-6xl text-[rgb(29,161,242)] font-bold">Welcome to &nbsp</h1>
      <h1 class=" flex justify-left text-4xl font-bold">Student Management System</h1>
      <h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</h1>
      <h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</h1>
    </div >

    <div >
      <nav class="flex  text-lg space-x-8">
  <RouterLink :to="{name:'students'}" custom v-slot="{ navigate, isActive }">
    <a @click="navigate" :class="isActive ? 'border-b-4 border-[rgb(29,161,242)]   pb-3 cursor-pointer' : 'hover:border-b-4 hover:border-[rgb(29,161,242)] pb-1 cursor-pointer'">Student</a>
  </RouterLink>
<h1 class="font-xl font-bold">|</h1>
  <RouterLink :to="{name:'teachers'}" custom v-slot="{ navigate, isActive }">
    <a @click="navigate" :class="isActive ? 'border-b-4 border-[rgb(158,118,180)] pb-3 cursor-pointer' : 'hover:border-b-4 hover:border-[rgb(158,118,180)] pb-1 cursor-pointer '">Advisor</a>
  </RouterLink>
  <h1 class="font-xl font-bold">|</h1>
        <RouterLink :to="{name:'Announcements'}" custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-b-4 border-[rgb(36,215,96)] pb-3 cursor-pointer' : 'hover:border-b-4 hover:border-[rgb(36,215,96)] pb-1 cursor-pointer '">Announcements</a>
        </RouterLink>
        <h1 class="font-xl font-bold">|</h1>
        <RouterLink :to="{name:'Login'}" v-if="!authStore.token" custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-b-4 border-[rgb(230,145,56)] pb-3 cursor-pointer' : 'hover:border-b-4 hover:border-[rgb(158,118,180)] pb-1 cursor-pointer '">Login</a>
        </RouterLink>
        <a v-else @click="logout" class="border-b-4 border-[rgb(230,145,56)] pb-3 cursor-pointer">Logout</a>

        <h1 class="font-xl font-bold">|</h1>

        <RouterLink :to="{name:'StudentForm'}" v-if="authStore.isAdmin || authStore.isDistributor" custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-active-class' : 'border-inactive-class'">
            Student register
          </a>
        </RouterLink>

        <h1 class="font-xl font-bold " v-if="authStore.isAdmin" >|</h1>

        <RouterLink :to="{name:'TeacherForm'}" v-if="authStore.isAdmin " custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-active-class' : 'border-inactive-class'">
            Add Teacher
          </a>
        </RouterLink>

        <h1 class="font-xl font-bold" v-if="authStore.isAdmin">|</h1>

        <RouterLink :to="{name:'Overallpage'}" v-if="authStore.isAdmin" custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-active-class' : 'border-inactive-class'">
            Overall Page
          </a>
        </RouterLink>

        <!-- 当身份为 isFastFit 时 -->
        <RouterLink :to="{name:'AddAnnouncement'}" v-else-if="authStore.isFastFit" custom v-slot="{ navigate, isActive }">
          <a @click="navigate" :class="isActive ? 'border-active-class' : 'border-inactive-class'">
            Add Announcements
          </a>
        </RouterLink>

        <h1 class="font-xl font-bold" v-if="authStore.isAdmin|| authStore.isFastFit|| authStore.isDistributor">|</h1>

        <div class="flex items-center" v-if="authStore.isAdmin || authStore.isFastFit || authStore.isDistributor">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
          </svg>
          <h1 class="font-xl font-bold">
            {{ authStore.currentUserName }}
          </h1>
        </div>


</nav>
</div >
  

  
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import StudentService from "@/services/StudentService";  // 需要引入你的StudentService
import TeacherService from "@/services/TeacherService";
import {onMounted, ref} from "vue";

const authStore = useAuthStore();

const studentCount = ref(0);  // 学生数量
const teacherCount = ref(0);  // 老师数量

const fetchCounts = async () => {
  const students = await StudentService.getStudents(1000, 1);  // 假设最大为1000，你也可以更改这个值
  const teachers = await TeacherService.getAllteachers();

  studentCount.value = students.data.length;
  teacherCount.value = teachers.data.length;
};

onMounted(fetchCounts);

const logout = () => {
  authStore.logout();
  location.reload();
};
</script>






