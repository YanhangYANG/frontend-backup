import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";
import type { Teacher } from "@/type";

export default {
  getAllteachers(): Promise<AxiosResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>("/advisors");
  },
  searchTeachersByName(name: string): Promise<AxiosResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(`/advisors/searchByTeacherFirstname?firstname=${name}`);
  },
  getTeachers(
    perPage: number,
    page: number,
  ): Promise<AxiosResponse<Teacher[]>> {
    return apiClient.get<Teacher[]>(
      "/advisors?_limit=" + perPage + "&_page=" + page,
    );
  },
  getTeacherById(id: string): Promise<AxiosResponse<Teacher>> {
    return apiClient.get<Teacher>(
      "advisors/" + id.toString(),
    );
  },
  saveTeacher(event: Teacher): Promise<AxiosResponse<Teacher>> {
    return apiClient.post < Teacher > ('/advisors', event)
  }
};
