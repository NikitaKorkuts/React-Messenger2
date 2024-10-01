import React, {ChangeEvent} from 'react';

import editIcon from '../../../../assets/icons/edit-cursor.png';
import {ProfileStatusPropsType, ProfileStatusStateType} from '../profile.types';
import s from '../profile.module.scss';

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false,
        status: this.props.status,
    };
    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };
    deactivateEditMode = () => {
        const {updateStatus} = this.props;

        this.setState({
            editMode: false,
        });
        updateStatus(this.state.status);
    };
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
        const {status} = this.props;
        if (prevProps.status !== status) {
            this.setState({status: status});
        }
    }

    render() {
        const {status, isOwner} = this.props;

        if (isOwner) {
            return (
                <>
                    {!this.state.editMode && (
                        <div className={`${s.status} ${s.ownerStatus}`}>
                            <span
                                className={s.aboutMeText}
                                onClick={this.activateEditMode}
                            >
                                {status || 'no status'}
                                <img
                                    src={editIcon}
                                    alt="edit-icon"
                                    className={s.statusEditIcon}
                                />
                            </span>

                        </div>
                    )}
                    {this.state.editMode && (
                        <div>
                            <input
                                className={s.editStatusForm}
                                type="text"
                                onChange={this.onStatusChange}
                                autoFocus={true}
                                onBlur={this.deactivateEditMode}
                                value={this.state.status}
                            />
                        </div>
                    )}
                </>
            );
        }
        return (
            <div className={s.status}>
                <p className={s.aboutMeText}>
                    {status || 'no status'}
                </p>
            </div>
        );
    }
}