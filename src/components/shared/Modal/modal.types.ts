import React from 'react';

export type ModalPropsType = {
    children: React.ReactNode
    active: boolean
    setActive: (active: boolean) => void
}