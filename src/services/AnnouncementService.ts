import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Announcement } from "@/type";
import apiClient from "@/services/AxiosClient";


export default {
    getAnnouncements(
        perPage: number,
        page: number,
    ): Promise<AxiosResponse<Announcement[]>> {

            return apiClient.get<Announcement[]>(
                "/announcements?_limit=" + perPage + "&_page=" + page,
            );
    },
    getAnnouncementById(id: string): Promise<AxiosResponse<Announcement>> {
        return apiClient.get<Announcement>("announcements/" + id.toString());
    },

    saveAnnouncement(event: Announcement): Promise<AxiosResponse<Announcement>> {
        return apiClient.post < Announcement > ('/announcements', event)
    }

}