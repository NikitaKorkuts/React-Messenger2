import {ProfileType} from '../../../store/profile/profile.types';
import {ContactsType, Nullable} from '../../../types/types';

export type ProfileContainerPropsType = {
    authUserId: number,
    isAuth: boolean,
    profile: ProfileType | null
    status: string
    profileUpdatingStatus: string
    getUserProfile: (id: number | null) => Promise<void>
    getUserStatus: (id: number) => Promise<void>
    updateUserStatus: (status: string) => Promise<void>
    setProfileUpdatingStatus: (status: string) => void
    updateUserAvatar: (image: File) => Promise<void>
    updateProfile: (profile: ProfileType) => Promise<void>
    getIsFriend: (id: number | null) => Promise<void>
    isFriend: boolean | null
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setIsFriend: (isFriend: boolean | null) => void
}

export type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    profileUpdatingStatus: string
    updateUserStatus: (status: string) => Promise<void>
    setProfileUpdatingStatus: (status: string) => void
    updateUserAvatar: (image: File) => Promise<void>
    updateProfile: (
        profile: ProfileType,
        setStatus: (status: object) => void,
        setErrors: (errors: object) => void
    ) => Promise<void>
    isFriend: boolean | null
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setIsFriend: (isFriend: boolean | null) => void
}

export type ProfileJobSearchStatusType = {
    areLookingForJob: Nullable<boolean>
}

export type ProfileAboutMePropsType = {
    aboutMe: Nullable<string>
    lookingForAJobDescription: Nullable<string>
}

export type ProfileContactsPropsType = {
    contacts: Nullable<ContactsType>
}

export type ProfileInfoPropsType = {
    status: string
    profile: ProfileType
    updateStatus: (status: string) => Promise<void>
    updateAvatar: (image: File) => Promise<void>
    isOwner: boolean
}

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

export type ProfileStatusStateType = {
    editMode: boolean
    status: string
}

export type ProfileEditDataFormsPropsType = {
    profile: ProfileType
    submit: (values: ProfileType, setStatus: (status: object) => void, setErrors: (errors: object) => void) => void
}

