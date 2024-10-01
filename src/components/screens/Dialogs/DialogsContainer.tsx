import {connect} from 'react-redux';
import {Component} from 'react';
import {compose} from 'redux';

import {AppStateType} from '../../../store/store.types';
import {getDialogs, getNewMessagesCount} from '../../../store/dialogs/dialogs.actions';
import {withAuthRedirect} from '../../../hocs/withAuthRedirect';

import {Dialogs} from './Dialogs';
import {DialogsContainerPropsType} from './dialogs.types';

class DialogsContainer extends Component<DialogsContainerPropsType> {
    componentDidMount() {
        const {getDialogs} = this.props;

        getDialogs();
    }

    componentDidUpdate(prevProps: DialogsContainerPropsType) {
        const {getDialogs, newMessagesCount} = this.props;

        if (prevProps.newMessagesCount !== newMessagesCount) {
            getDialogs();
        }
    }

    render() {
        const {dialogs, authUserId} = this.props;

        return (
            <Dialogs
                dialogs={dialogs}
                authUserId={authUserId}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogs.dialogs,
        authUserId: state.auth.userId,
        newMessagesCount: state.dialogs.newMessagesCount,
    };
};

export default compose<React.ComponentType>(withAuthRedirect, connect(mapStateToProps, {
    getDialogs,
    getNewMessagesCount,
}))(DialogsContainer);