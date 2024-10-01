import {instance} from '../services';
import {ProfileType} from '../../store/profile/profile.types';
import {ResponseType} from '../services.types';

import {SetUserAvatarDataResponseType} from './profile.types';

export const profileServices = {
    getUserProfile(id: number | null) {
        return instance.get<ProfileType>(`profile/${id}`)
            .then(response => {
                return response.data;
            });
    },
    getUserStatus(userId: number) {
        return instance.get<string | null>(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    updateUserStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status: status})
            .then(res => res.data);
    },
    setUserAvatar(image: File) {
        const formData = new FormData();
        formData.append('image', image);
        return instance.put<ResponseType<SetUserAvatarDataResponseType>>('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            return response.data;
        });
    },
    setUserProfile(profile: ProfileType) {
        return instance.put<ResponseType>('profile', profile)
            .then(res => res.data);
    },
};