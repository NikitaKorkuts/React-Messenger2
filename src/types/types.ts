export type Nullable<T> = T | null | undefined

export type RouterType = {
    router: {
        location: {
            hash: string
            key: string
            pathname: string
            search: string
            state: null
        }
        navigate: (to: object) => void
        params: {
            id: number
        }
    }
}

export type ContactsType = {
    [key: string]: string | null;
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type UsersType = {
    name: string
    id: number
    photos: PhotosType,
    status: string | null,
    followed: boolean
}
