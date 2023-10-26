import apiClient from '@/services/AxiosClient.js'

const initialToken = localStorage.getItem('access_token');
if (initialToken) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}
apiClient.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('access_token')
        console.log('token', token)
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
);

// 添加一个新的响应拦截器
apiClient.interceptors.response.use(undefined, error => {
    if (error.response && error.response.status === 403) {
        // 这里假设你有一个可以用来刷新 token 的刷新 token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            return apiClient.post('/api/v1/auth/refresh', { refreshToken })
                .then(response => {
                    // 保存新的访问 token
                    const newAccessToken = response.data.access_token;
                    localStorage.setItem('access_token', newAccessToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    // 重试原始请求
                    const originalRequest = error.config;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                });
        }
    }

    return Promise.reject(error);
});
