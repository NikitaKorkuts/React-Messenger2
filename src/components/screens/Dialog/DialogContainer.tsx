import React, {Component, RefObject} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {withRouter} from '../../../hocs/withRouter';
import {AppStateType} from '../../../store/store.types';
import {
    deleteMessage,
    dialogsActions, getActiveDialog,
    getChattingUserProfile,
    getMessages,
    getTotalPagesCount, sendMessage,
} from '../../../store/dialogs/dialogs.actions';
import {RouterType} from '../../../types/types';
import {Preloader} from '../../shared/Preloader/Preloader';
import {compareDates} from '../../../utils/dates/compareDate';
import {getFormattedDateWithFullMonth} from '../../../utils/dates/getFormattedDateWithFullMonth';
import {getFormattedDateHMM} from '../../../utils/dates/getFormattedDateHMM';
import {withAuthRedirect} from '../../../hocs/withAuthRedirect';

import s from './dialog.module.scss';
import {DialogContainerPropsType} from './dialog.types';
import {Dialog} from './Dialog';


class DialogContainer extends Component<RouterType & DialogContainerPropsType> {
    dialogEndRef: RefObject<HTMLDivElement> = React.createRef();
    messagesRequestTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
    });

    componentDidMount() {
        const {setActiveDialogId, router} = this.props;

        setActiveDialogId(Number(router.params.id));
    }

    componentWillUnmount() {
        const {resetMessages, setActiveDialogId, getActiveDialog} = this.props;

        if (this.messagesRequestTimer) clearTimeout(this.messagesRequestTimer);
        resetMessages();
        setActiveDialogId(null);
        getActiveDialog(null);
    }


    UNSAFE_componentWillUpdate(nextProps: RouterType & DialogContainerPropsType) {
        const {
            updatingMessages,
            getMessages,
            pageCount,
            router,
            resetMessages,
            activeDialogId,
            setActiveDialogId,
        } = this.props;

        if (nextProps.updatingMessages !== updatingMessages) {
            if (this.messagesRequestTimer) clearTimeout(this.messagesRequestTimer);
            if (activeDialogId) {
                this.messagesRequestTimer = setTimeout(() => {
                    getMessages(activeDialogId, 1, pageCount);
                }, 2000);
            }
        }

        if (router.params.id !== nextProps.router.params.id) {
            resetMessages();
            setActiveDialogId(Number(nextProps.router.params.id));
        }
    }

    componentDidUpdate(prevProps: RouterType & DialogContainerPropsType) {
        const {
            activeDialogId,
            pageCount,
            getActiveDialog,
            getTotalPagesCount,
            getMessages,
            getChattingUserProfile,
        } = this.props;

        if (activeDialogId !== prevProps.activeDialogId) {
            if (activeDialogId) {
                getTotalPagesCount(activeDialogId);
                getMessages(activeDialogId, 1, pageCount);
                getMessages(activeDialogId, 2, pageCount);
                getChattingUserProfile(activeDialogId);
                getActiveDialog(activeDialogId);

                this.dialogEndRef.current?.scrollIntoView({behavior: 'smooth'});
            }
        }
    }

    fetchNotUpdatingMessages = () => {
        const {setCurrentPage, getMessages, currentPage, pageCount, activeDialogId} = this.props;

        if (activeDialogId) {
            setCurrentPage(currentPage + 1);
            getMessages(activeDialogId, currentPage + 1, pageCount);
        }
    };

    sendMessage = (msgBody: string) => {
        const {sendMessage, activeDialogId} = this.props;
        if (activeDialogId) {
            sendMessage(activeDialogId, msgBody);
        }
    };

    render() {
        const {
            updatingMessages,
            notUpdatingMessages,
            chattingUserProfile,
            authUserProfile,
            currentPage,
            totalPagesCount,
            isMessageSending,
            router,
            activeDialog,
            deleteMessage,
        } = this.props;

        if (!router.params.id) {
            return <Navigate to={'/dialogs'}/>;
        }
        return (
            <div className={s.dialog}>
                <Dialog
                    authUserProfile={authUserProfile}
                    chattingUserProfile={chattingUserProfile}
                    updatingMessages={updatingMessages}
                    notUpdatingMessages={notUpdatingMessages}
                    fetchNotUpdatingMessages={this.fetchNotUpdatingMessages}
                    currentPage={currentPage}
                    totalPagesCount={totalPagesCount}
                    sendMessage={this.sendMessage}
                    compareDates={compareDates}
                    getFormattedDateWithFullMonth={getFormattedDateWithFullMonth}
                    getFormattedDateHMM={getFormattedDateHMM}
                    activeDialog={activeDialog}
                    deleteMessage={deleteMessage}
                />
                <div ref={this.dialogEndRef}/>
                {isMessageSending && <Preloader/>}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    updatingMessages: state.dialogs.updatingMessages,
    notUpdatingMessages: state.dialogs.notUpdatingMessages,
    chattingUserProfile: state.dialogs.chattingUserProfile,
    authUserProfile: state.auth.authUserProfile,
    areMessagesFetching: state.dialogs.areMessagesFetching,
    currentPage: state.dialogs.currentPage,
    pageCount: state.dialogs.pageCount,
    totalPagesCount: state.dialogs.totalPagesCount,
    isMessageSending: state.dialogs.isMessageSending,
    activeDialogId: state.dialogs.activeDialogId,
    activeDialog: state.dialogs.activeDialog,
});


export default compose<React.ComponentType>(withRouter, withAuthRedirect, connect(mapStateToProps, {
    getMessages,
    getTotalPagesCount,
    getChattingUserProfile,
    setCurrentPage: dialogsActions.setCurrentPage,
    resetMessages: dialogsActions.resetMessages,
    sendMessage,
    getActiveDialog,
    setActiveDialogId: dialogsActions.setActiveDialogId,
    deleteMessage,
}))(DialogContainer);