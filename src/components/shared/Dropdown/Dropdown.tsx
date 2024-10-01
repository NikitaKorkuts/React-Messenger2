import React, {RefObject} from 'react';

import s from './dropdown.module.scss';
import {DropdownPropsType, DropdownStateType} from './dropdown.types';

export class Dropdown extends React.Component<DropdownPropsType, DropdownStateType> {
    state = {
        isOpen: false,
    };
    menuItemsRef: RefObject<HTMLDivElement> = React.createRef();

    handleClickOutsideMenuItems = (e: any) => {
        if(!this.menuItemsRef?.current?.contains(e.target)){
            this.setIsOpen(false);
        }
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideMenuItems);
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideMenuItems);
    };

    setIsOpen = (isOpen: boolean) => {
        this.setState({
            isOpen: isOpen,
        });
    };

    render() {
        const {header, menuItems} = this.props;

        return (
            <div
                ref={this.menuItemsRef}
                className={s.dropdown}
            >
                <div
                    className={s.header}
                    onClick={() => this.setIsOpen(!this.state.isOpen)}
                >
                    {header}
                </div>
                {this.state.isOpen && (
                    <div
                        className={s.menuItems}
                        onClick={() => this.setIsOpen(false)}
                    >
                        {menuItems}
                    </div>
                )}
            </div>
        );
    }
}