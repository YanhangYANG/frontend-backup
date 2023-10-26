import { defineStore } from 'pinia';
import apiClient from '@/services/AxiosClient';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('access_token') || null,
        username: localStorage.getItem('username') || null,
        roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles') as string) : [],
    }),
    getters: {
        currentUserName(): string {
            return this.username || '';
        },
        isAdmin(): boolean {
            return this.roles.includes('ROLE_ADMIN') || false;
        },
        isFastFit(): boolean {
            return this.roles.includes('ROLE_FASTFIT') || false;
        },
        isDistributor(): boolean {
            return this.roles.includes('ROLE_DISTRIBUTOR') || false;
        },
    },
    actions: {
        login(email: string, password: string) {
            return apiClient
                .post('/api/v1/auth/authenticate', {
                    username: email,
                    password: password,
                })
                .then((response) => {
                    this.token = response.data.access_token;
                    this.username = response.data.username;  // Assuming username and roles come from server response
                    this.roles = response.data.roles;

                    localStorage.setItem('access_token', this.token as string);
                    localStorage.setItem('username', this.username as string);
                    localStorage.setItem('roles', JSON.stringify(this.roles));

                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                    return response;
                });
        },
        logout() {
            apiClient.post('/api/v1/auth/logout')
                .then(() => {
                    this.token = null;
                    this.username = null;
                    this.roles = [];

                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('roles');
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        },
    },
});


