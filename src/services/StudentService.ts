import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Student } from "@/type";
import type { Teacher } from "@/type";
import apiClient from "@/services/AxiosClient";


export default {
  getAllStudents(): Promise<AxiosResponse<Student[]>> {
    return apiClient.get<Student[]>("/students");
  },
  getStudents(
    perPage: number,
    page: number,
  ): Promise<AxiosResponse<Student[]>> {

    return apiClient.get<Student[]>(
      "/students?_limit=" + perPage + "&_page=" + page,
    );
  },
  getStudentById(id: string): Promise<AxiosResponse<Student>> {
    return apiClient.get<Student>("students/" + id.toString());
  },

  getTeacherByTeacherID(id: string): Promise<AxiosResponse<Teacher>> {
    return apiClient.get<Teacher>("advisors/" + id.toString());
  },
  saveStudent(event: Student): Promise<AxiosResponse<Student>> {
    return apiClient.post < Student > ('/students', event)
  },
  updateStudent(id: string, updatedStudent: Student): Promise<AxiosResponse<Student>> {
    return apiClient.put<Student>(`/students/${id}`, updatedStudent);
  },


};


