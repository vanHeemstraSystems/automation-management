import { create } from 'zustand';
import {
    HassServiceTarget,
    callService,
    HassEntities,
    Connection
} from 'home-assistant-js-websocket';

interface CallService {
    domain: string;
    service: string;
    serviceData?: object;
    target: HassServiceTarget; 
}

interface HassState {
    ready: boolean;
    entities: null | HassEntities;
    setEntities: (entities: HassEntities) => void;
    connection: null | Connection;
    setConnection: (connection: Connection) => void;
    callSwitch: (entity: string, service?: string, serviceData?: object) => void;
    callLight: (entity: string, service?: string, serviceData?: object) => void;
    callService: ({
        domain,
        service,
        serviceData,
        target
    }: CallService) => void;
}

export const useHass = create<HassState>()((set, get) => ({
    connection: null,
    entities: null,
    ready: false,
    setEntities: entities => {
        set(() => ({ entities, ready: true }));
    },
    setConnection: (connection: Connection) => {
        set(() => ({ connection }));
    },
    callSwitch: async () => {
        // TO DO
    },
    callLight: async () => {
        // TO DO
    },
    callService: ({
        domain,
        service,
        serviceData,
        target
    }: CallService) => {

    }
}));
