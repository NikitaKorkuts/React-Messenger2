import React, {FC, Suspense} from 'react';
import {connect, Provider} from 'react-redux';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {compose} from 'redux';

import {Layout} from './components/layout/Layout';
import {store} from './store/store';
import {withRouter} from './hocs/withRouter';
import {Preloader} from './components/shared/Preloader/Preloader';
import {routes} from './constants/routes/routes';
import {AppStateType} from './store/store.types';
import {initializeApp} from './store/app/app.actions';
import {AppPropsType} from './types/app.types';



export class App extends React.Component<AppPropsType> {
    componentDidMount() {
        const {initializeApp} = this.props;
        initializeApp();
    }

    render () {
        const {initialized} = this.props;
        if (!initialized) {
            return <Preloader />;
        }
        return (
            <div className="App">
                <Layout>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            {routes.map(({path, component, child, childPath}) => {
                                if (child && childPath) {
                                    return (
                                        <Route key={path} path={path} element={component}>
                                            <Route path={childPath} element={child}/>
                                        </Route>
                                    );
                                } else {
                                    return <Route key={path} path={path} element={component}/>;
                                }
                            })}
                        </Routes>
                    </Suspense>
                </Layout>
            </div>
        );
    }
};

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

export const MessangerApp: FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    );
};
