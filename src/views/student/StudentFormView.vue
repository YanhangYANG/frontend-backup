<script setup lang="ts">
import type { Student,Teacher } from '@/type'  // Assuming you have a Student type defined
import StudentService from "@/services/StudentService";
import {Field, Form, useForm} from 'vee-validate';
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue'
import { useMessageStore } from '@/stores/message';
import BaseInput from "@/components/BaseInput.vue";
import ImageUploadSingle from '@/components/ImageUploadSingle.vue'
import TeacherService from "@/services/TeacherService";
import { defineRule } from 'vee-validate';
import {required, email, min, numeric} from '@vee-validate/rules';
import * as yup from 'yup';
import teacherService from "@/services/TeacherService";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();



const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

defineRule('noNumbers', (value: string) => {
  if (/\d/.test(value)) {
    return 'This field cannot contain numbers';
  }
  return true;
});

defineRule('required', (value: string) => {
  if (!value || !value.length) {
    return 'This field is required';
  }
  return true;
});
defineRule('numeric', numeric);
defineRule('studentIdRule', (value: string) => {
  if (!value.startsWith('6')) {
    return 'Student ID must start with 6';
  }

  if (value.length !== 9) {
    return 'Student ID must be exactly 9 digits long';
  }

  if (!/^\d+$/.test(value)) {
    return 'Student ID must contain only digits';
  }

  return true;
});

function convertStudentForBackend(frontendStudent) {
  return {
    ...frontendStudent,
    advisor: frontendStudent.advisor ? { id: frontendStudent.advisor.id } : null
  };
}


const store = useMessageStore();
const advisors = ref<Teacher[]>([]);
const router = useRouter()
onMounted(async () => {
  try {
    const response = await TeacherService.getAllteachers();
    advisors.value = response.data;
  } catch (error) {
    console.error('Failed to load advisors:', error);
  }
});
const student = ref({
  id: 0,
  studentId: '',
  studentPw: '',
  firstname: '',
  surname: '',
  department: '',
  advisor: null,
  images: [],
});

const { errors, handleSubmit } = useForm();

function saveStudent() {
  // 使用新的函数转换 student 对象
  const studentForBackend = convertStudentForBackend(student.value);

  // 然后传递转换后的对象给后端服务
  StudentService.saveStudent(studentForBackend)
      .then((response) => {
        console.log(response.data);
        router.push({
          path: '/'
        });
        store.updateMessage('You have successfully added a new student: ' + response.data.firstname + ' ' + response.data.surname);
        setTimeout(() => {
          store.updateMessage('');
        }, 3000);
      })
      .catch(() => {
        router.push({name: 'network-error'});
      });
}



const onSubmit = handleSubmit(saveStudent);

</script>

<template>
  <div>
    <h1>Add a Student</h1>
    <form @submit="onSubmit">

      <div>
        <h1>Student ID</h1>
      <Field name="studentId" rules="studentIdRule" v-model="student.studentId"></Field>
      <span class="error-text">{{  errors['studentId']  }}</span>
      </div>

      <div>
        <h1>Password</h1>
        <Field name="studentPw" rules="required" type="password" v-model="student.studentPw"></Field>
        <span class="error-text">{{  errors['studentPw']  }}</span>
      </div>

      <div>
        <h1>Firstname</h1>
        <Field name="firstname" :rules="{ required: true, noNumbers: true }" v-model="student.firstname"></Field>
        <span class="error-text">{{ errors['firstname'] }}</span>
      </div>

      <div>
        <h1>Surname</h1>
        <Field name="surname" :rules="{ required: true, noNumbers: true }" v-model="student.surname"></Field>
        <span class="error-text">{{ errors['surname'] }}</span>
      </div>

      <div>
        <h1>Department</h1>
        <Field name="department" rules="required" v-model="student.department"></Field>
        <span class="error-text">{{  errors['department']  }}</span>
      </div>

      <div class="mb-4" v-if="authStore.isAdmin">
        <label for="advisee" class="block text-sm font-medium text-gray-600 mb-1">Select Advisees</label>
        <select id="advisee" v-model="student.advisor" class="mt-1 p-2 w-full border rounded-md">
          <option v-for="teachers in advisors" :key="teachers.id" :value="teachers">
            {{ teachers.firstname }} {{ teachers.surname }}
          </option>
        </select>
      </div>

      <ImageUploadSingle v-model="student.images" />

      <!-- Assuming you have a way to select advisor -->


      <button class="button" type="submit">Submit</button>
    </form>

    <pre class="student-display">
      {{ JSON.stringify(student, null, 2).slice(1, -1) }}
    </pre>
  </div>
</template>
<style>
.error-text {
  color: red;
  font-size: 20px;
}
b,
strong {
  font-weight: bolder;
}
small {
  font-size: 80%;
}
.eyebrow {
  font-size: 20px;
}
.-text-primary {
  color: #39b982;
}
.-text-base {
  color: #000;
}
.-text-error {
  color: tomato;
}
.-text-gray {
  color: rgba(0, 0, 0, 0.5);
}
.-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}

button,
label,
input,
optgroup,
select,
textarea {
  display: inline-flex;
  font-family: 'Open sans', sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: none;
}
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring {
  outline: 2px solid #39b982;
}
label {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}
input,
textarea {
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
}
input.error,
select.error {
  margin-bottom: 0;
}
input + p.errorMessage {
  margin-bottom: 24px;
}
textarea {
  width: 100%;
  overflow: auto;
  font-size: 20px;
}
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
  margin-right: 0.5rem;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
input,
[type='text'],
[type='number'],
[type='search'],
[type='password'] {
  height: 52px;
  width: 100%;
  padding: 0 10px;
  font-size: 20px;
}
input,
[type='text']:focus,
[type='number']:focus,
[type='search']:focus,
[type='password']:focus {
  border-color: #39b982;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
[hidden] {
  display: none;
}
.error {
  border: 1px solid red;
}
select {
  width: 100%;
  height: 52px;
  padding: 0 24px 0 10px;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 8px 10px;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
select:focus {
  border-color: #39b982;
  outline: 0;
}
select:focus::ms-value {
  color: #000;
  background: #fff;
}
select::ms-expand {
  opacity: 0;
}
.field {
  margin-bottom: 24px;
}
.error {
  border: 1px solid red;
}
.errorMessage {
  color: red;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s linear;
}
.button:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.button:focus {
  outline: 0;
}
.button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
}
.button + .button {
  margin-left: 1em;
}
.button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}
.button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.button.-size-small {
  height: 32px;
}
.button.-icon-right {
  text-align: left;
  padding: 0 20px;
}
.button.-icon-right > .icon {
  margin-left: 10px;
}
.button.-icon-left {
  text-align: right;
  padding: 0 20px;
}
.button.-icon-left > .icon {
  margin-right: 10px;
}
.button.-icon-center {
  padding: 0 20px;
}
.event-display {
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap; /* 为了使多行显示正确 */
}
</style>