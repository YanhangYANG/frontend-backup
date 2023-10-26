import { createRouter, createWebHistory } from "vue-router";
import Student from "../views/student/StudentListView.vue";
import Announcements from "../views/announcement/AnnouncementListView.vue";
import AnnouncementDetailView from "@/views/announcement/AnnouncementDetailView.vue";
import AnnouncementLayoutView from "@/views/announcement/AnnouncementLayoutView.vue";
import StudentDetailView from "@/views/student/StudentDetailView.vue";
import StudentLayoutView from "@/views/student/StudentLayoutView.vue";
import Teacher from "../views/teacher/TeacherListView.vue";
import TeacherDetailView from "@/views/teacher/TeacherDetailView.vue";
import TeacherLayoutView from "@/views/teacher/TeacherLayoutView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AddStudentAdvisor from "@/views/student/AddStudentAdvisor.vue";
import NProgress from "nprogress";
import { useEventStore, useTeacherStore } from "../stores/event";
import StudentService from "../services/StudentService";
import TeacherService from "../services/TeacherService";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/login/RegisterView.vue";
import StudentFormView from "@/views/student/StudentFormView.vue";
import TeacherFormView from "@/views/teacher/TeacherFormView.vue";
import axios from 'axios';
import AnnouncementService from "@/services/AnnouncementService";
import AnnouncementFormView from "@/views/announcement/AnnouncementFormView.vue";
import Overallpage from "@/views/Overallpage.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "students",
      component: Student,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
        pageSize: parseInt((route.query?.page as string) || "2"),
      }),
    },
    {
path: "/overallpage",
name: "Overallpage",
component: Overallpage,

    },
    {
      path: '/announcements',
      name: 'Announcements',
      component: Announcements,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
        pageSize: parseInt((route.query?.page as string) || "2"),
      }),
    },
    {
      path: '/add-student-advisor',
      name: 'AddStudentAdvisor',
      component: AddStudentAdvisor
    },
    {
      path: '/add-announcement',
      name: 'AddAnnouncement',
      component: AnnouncementFormView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView

    },
    {
     path: '/student-form',
        name: 'StudentForm',
        component: StudentFormView

    },
    {
        path: '/teacher-form',
        name: 'TeacherForm',
        component: TeacherFormView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: "/teacher",
      name: "teachers",
      component: Teacher,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
        pageSize: parseInt((route.query?.page as string) || "2"),
      }),
    },
    {
      path: "/student/:studentId",
      name: "student-layout",
      component: StudentLayoutView,
      props: true,
      beforeEnter: (to) => {
        const studentId: string = to.params.studentId as string;
        const eventStore = useEventStore();
        return StudentService.getStudentById(studentId)
          .then((response) => {
            if ((response.data as any).length === 0) {
              return { name: '404-resource', params: { resource: 'student' } };
            } else {
              eventStore.setEvent(response.data as any);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return { name: '404-resource', params: { resource: 'student' } };
            } else {
              return { name: 'network-error' };
            }
          });
      },
      
      
      children: [
        {
          path: "",
          name: "student-detail",
          component: StudentDetailView,
          props: true,
        },
      ],
    },
    {
      path: "/teacher/:teacherId",
      name: "teacher-layout",
      component: TeacherLayoutView,
      props: true,
      beforeEnter: (to) => {
        const teacherId: string = to.params.teacherId as string;
        const TeachereventStore = useTeacherStore();
        return TeacherService.getTeacherById(teacherId)
          .then((response) => {
            if ((response.data as any).length === 0) {
              return { name: '404-resource', params: { resource: 'teacher' } };
            }else {
              TeachereventStore.setEvent(response.data as any);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return { name: '404-resource', params: { resource: 'teacher' } };
            } else {
              return { name: 'network-error' };
            }
          });
      },
      children: [
        {
          path: "",
          name: "teacher-detail",
          component: TeacherDetailView,
          props: true,
        },
      ],
    },

    {
      path: '/announcements/:announcementId',
      name: 'announcement-layout',
      component: AnnouncementLayoutView,
      props: true,
      beforeEnter: (to) => {
        const Id: string = to.params.announcementId as string;
        const eventStore = useEventStore();
        return AnnouncementService.getAnnouncementById(Id)
            .then((response) => {
              if (!response.data) {
                return { name: '404-resource', params: { resource: 'announcement' } };
              } else {
                eventStore.setEvent(response.data as any);
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return { name: '404-resource', params: { resource: 'announcement' } };
              } else {
                return { name: 'network-error' };
              }
            });
      },
      children: [
        {
          path: '',
          name: 'announcement-detail',
          component: AnnouncementDetailView,
          props: true
        },
      ],
    },


    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }else{
      return { top: 0 }
    }
  }
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});


router.beforeEach((to, from, next) => {
  // 从本地存储中获取令牌
  const token = localStorage.getItem('access_token');

  if (token) {
    // 如果令牌存在，将其设置到 axios 的请求头中
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // 如果令牌不存在，清除可能存在的旧令牌
    delete axios.defaults.headers.common['Authorization'];
  }

  // 继续导航
  next();
});

export default router;

