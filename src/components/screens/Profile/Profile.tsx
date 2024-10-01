import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {ProfileType} from '../../../store/profile/profile.types';
import {Preloader} from '../../shared/Preloader/Preloader';

import {ProfileAboutMe} from './ProfileAboutMe/ProfileAboutMe';
import {ProfileContacts} from './ProfileContacts/ProfileContacts';
import {ProfileEditDataForms} from './ProfileEditDataForms/ProfileEditDataForms';
import {ProfilePropsType} from './profile.types';
import {ProfileJobSearchStatus} from './ProfileJobSearchStatus/ProfileJobSearchStatus';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import s from './profile.module.scss';

export class Profile extends Component<ProfilePropsType> {
    state = {
        editMode: false,
    };

    _setEditMode(status: boolean) {
        this.setState(() => ({
            editMode: status,
        }));
    }

    onSubmit(values: ProfileType, setStatus: (status: object) => void, setErrors: (errors: object) => void) {
        const {updateProfile} = this.props;

        updateProfile(values, setStatus, setErrors)
            .then(() => {
                this._setEditMode(false);
            });
    }

    handleFollow() {
        const {follow, setIsFriend, profile} = this.props;

        follow(profile?.userId as number);
        setIsFriend(true);
    }

    handleUnfollow() {
        const {unfollow, setIsFriend, profile} = this.props;

        unfollow(profile?.userId as number);
        setIsFriend(false);
    }

    getFollowBtn() {
        const {isFriend, isOwner} = this.props;

        if (!isOwner) {
            return isFriend
                ? (
                    <div className={s.follow}>
                        <button
                            className={s.followBtn}
                            onClick={() => this.handleUnfollow()}
                        >
                            Отписаться
                        </button>
                    </div>
                )
                : (
                    <div className={s.follow}>
                        <button
                            className={s.followBtn}
                            onClick={() => this.handleFollow()}
                        >
                            Подписаться
                        </button>
                    </div>
                );
        }
    }

    render() {
        const {
            isOwner,
            profile,
            status,
            updateUserAvatar,
            updateUserStatus,
        } = this.props;


        if (!profile) {
            return <Preloader/>;
        }

        if (this.state.editMode) {
            return <ProfileEditDataForms submit={this.onSubmit.bind(this)} profile={profile}/>;
        } else {
            return (
                <div className={s.profile}>
                    <div className={s.profileHeader}>
                        <ProfileInfo
                            isOwner={isOwner}
                            profile={profile}
                            updateStatus={updateUserStatus}
                            updateAvatar={updateUserAvatar}
                            status={status}
                        />
                        <div className={s.profileButtons}>
                            {isOwner
                                ? (
                                    <div className={s.editProfile}>
                                        <button
                                            className={s.editProfileBtn}
                                            onClick={() => {
                                                this._setEditMode(true);
                                            }}
                                        >
                                            Редактировать Профиль
                                        </button>
                                    </div>
                                )
                                : (
                                    <div className={s.writeMessage}>
                                        <Link to={`/dialog/${profile.userId}`}>
                                            <button className={s.writeMessageBtn}>
                                                Написать сообщение
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            {this.getFollowBtn()}
                        </div>
                    </div>
                    <ProfileJobSearchStatus
                        areLookingForJob={profile.lookingForAJob}
                    />
                    <div className={s.profileInfo}>
                        <ProfileAboutMe
                            aboutMe={profile.aboutMe}
                            lookingForAJobDescription={profile.lookingForAJobDescription}
                        />
                        <ProfileContacts
                            contacts={profile.contacts}
                        />
                    </div>
                </div>
            );
        }
    }
}
