import React, {FC, PropsWithChildren} from 'react';

import HeaderContainer from './Header/HeaderContainer';

export const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <HeaderContainer />
            <main>
                {children}
            </main>
        </>
    );
};