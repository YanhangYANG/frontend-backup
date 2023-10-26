<script setup lang="ts">
import StudentService from "@/services/StudentService";
import TeacherService from "@/services/TeacherService";
import { ref, onMounted } from 'vue';
import type { Student, Teacher } from '@/type'  // 假设你的 TypeScript 接口在 'types.ts' 文件中

const allStudents = ref<Student[]>([]);
const allTeachers = ref<Teacher[]>([]);
const teacherCount = ref(0);
const studentCount = ref(0);// 用于存储老师数量的响应式引用

const fetchAllData = async () => {
  const studentResponse = await StudentService.getAllStudents();
  const teacherResponse = await TeacherService.getAllteachers();

  allStudents.value = studentResponse.data;
  allTeachers.value = teacherResponse.data;
  teacherCount.value = allTeachers.value.length;
  studentCount.value = allStudents.value.length;
};


onMounted(fetchAllData);
</script>

<template>
  <!-- Students Table -->

  <h1 class="text-3xl">Total Number of Students: {{ studentCount }}</h1>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Students</h2>
    <table class="min-w-full bg-white">
      <thead>
      <tr>
        <th class="py-2 px-4 border">ID</th>
        <th class="py-2 px-4 border">First Name</th>
        <th class="py-2 px-4 border">Surname</th>
        <th class="py-2 px-4 border">Student ID</th>
        <th class="py-2 px-4 border">Department</th>
        <!-- ... other columns -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in allStudents" :key="student.id">
        <td class="py-2 px-4 border">{{ student.id }}</td>
        <td class="py-2 px-4 border">{{ student.firstname }}</td>
        <td class="py-2 px-4 border">{{ student.surname }}</td>
        <td class="py-2 px-4 border">{{ student.studentId }}</td>
        <td class="py-2 px-4 border">{{ student.department }}</td>
        <!-- ... other columns -->
      </tr>
      </tbody>
    </table>
  </div>

  <h1 class="text-3xl">Total Number of Teachers: {{ teacherCount }}</h1>
  <!-- Teachers Table -->
  <div>
    <h2 class="text-2xl font-bold mb-4">Teachers</h2>
    <table class="min-w-full bg-white">
      <thead>
      <tr>
        <th class="py-2 px-4 border">ID</th>
        <th class="py-2 px-4 border">First Name</th>
        <th class="py-2 px-4 border">Surname</th>
        <th class="py-2 px-4 border">Teacher ID</th>
        <th class="py-2 px-4 border">Department</th>
        <!-- ... other columns -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="teacher in allTeachers" :key="teacher.id">
        <td class="py-2 px-4 border">{{ teacher.id }}</td>
        <td class="py-2 px-4 border">{{ teacher.firstname }}</td>
        <td class="py-2 px-4 border">{{ teacher.surname }}</td>
        <td class="py-2 px-4 border">{{ teacher.teacherId }}</td>
        <td class="py-2 px-4 border">{{ teacher.department }}</td>
        <!-- ... other columns -->
      </tr>
      </tbody>
    </table>
  </div>
</template>
