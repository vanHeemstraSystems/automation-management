import React, { useEffect, ReactElement } from 'react';
import {
    getAuth,
    createConnection,
    subscribeEntities,
    getAuthOptions as AuthOptions,
    Auth,
    ERR_HASS_HOST_REQUIRED,
    UnsubscribeFunc
} from 'home-assistant-js-websocket';

import { useHass } from '@hooks';

// const BASE_URL = process.env.REACT_APP_HOME_ASSISTANT_URL_DEV; // TO DO: Make it dynamic, based on NODE_ENV being development or production
const BASE_URL = 'http://localhost:8122';

function getAuthOptions(): AuthOptions {
    return {
        hassUrl: BASE_URL,
        async loadTokens() {
            try {
                return JSON.parse(localStorage.hassTokens);
            } catch(e) {
                return undefined;
            }
        },
        saveTokens(tokens) {
            localStorage.hassTokens = JSON.stringify(tokens);
        }
    }
}

interface AuthenticateProps {
    children: ReactElement
}

export const Authenticate = ({
    children
}: AuthenticateProps): ReactElement => {
    const { setConnection, setEntities, ready } = useHass();
    let auth: Auth | null = null;
    let unsubscribe: UnsubscribeFunc | null = null;

    useEffect(() => {
        (async function authenticate() {
            try {
                auth = await getAuth(getAuthOptions());
                //debugger;
                if (auth.expired) {
                    auth.refreshAccessToken();
                }
            } catch(e) {
                //debugger;
                if(e === ERR_HASS_HOST_REQUIRED) {
                    auth = await getAuth(getAuthOptions());
                } else {
                    console.error(e);
                    return;
                }
            }
            const connection = await createConnection({
                auth
            });
            setConnection(connection);
            unsubscribe = subscribeEntities(connection, entities => {
                setEntities(entities);
            });
            if (location.search.includes('auth_callback=1')) {
                history.replaceState(null, '', location.pathname);
            }
        }());

        if (unsubscribe !== null) {
            return () => unsubscribe();
        }
    }, [])

    return ready ? children : <>...loading</>;
};
