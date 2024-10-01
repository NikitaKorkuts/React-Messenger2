import React from 'react';

export type DropdownPropsType = {
    header: React.ReactNode
    menuItems: React.ReactNode
}

export type DropdownStateType = {
    isOpen: boolean
}