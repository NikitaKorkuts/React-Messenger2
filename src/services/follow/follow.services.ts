import {instance} from '../services';
import {ResponseType} from '../services.types';

export const followServices = {
    follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`, {})
            .then(response => {
                return response.data;
            });
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    getIsFriend(id: number) {
        return instance.get<boolean>(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
};