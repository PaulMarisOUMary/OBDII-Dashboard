import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

import Bridge from '../api/bridge';

const DEFAULT_POLL_INTERVAL = 250;

type DataContextType = {
    data: Record<string, any>;
    bridge: Bridge;
    setBridge: React.Dispatch<React.SetStateAction<Bridge>>;
    isConnected: boolean;
    error?: string;
};

type DataProviderProps = {
    bridge: Bridge;
    setBridge: React.Dispatch<React.SetStateAction<Bridge>>;
    pollInterval?: number;
    children: React.ReactNode;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ bridge, setBridge, pollInterval = DEFAULT_POLL_INTERVAL, children }: DataProviderProps) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                await bridge.disconnect();
                await bridge.connect({
                    port: "COM5"
                } as Record<string, any>);
                const status = await bridge.status();
                setIsConnected(status);
                setError(undefined);
            } catch (error) {
                console.error('Error checking connection:', error);
                setIsConnected(false);
                setError('Failed to connect');
            }
        };

        checkConnection();
    }, [bridge]);

    const poll = useCallback(async () => {
        if (!isConnected) return;

        try {
            const newData = await bridge.getData();
            if (newData) {
                setData(newData.data || {});
                setError(undefined);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsConnected(false);
            setError('Failed to fetch data');
        }
    }, [isConnected, bridge]);

    useEffect(() => {
        poll();

        intervalRef.current = setInterval(() => {
            poll();
        }, pollInterval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [poll, pollInterval]);

    return (
        <DataContext.Provider value={{ data, bridge, setBridge, isConnected, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useData must be used within a DataProvider');
    return ctx;
};
