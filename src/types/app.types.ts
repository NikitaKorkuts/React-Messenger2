import {RouterType} from './types';

export type AppPropsType = {
    initialized: boolean
    initializeApp: () => Promise<void>
    router: RouterType
}