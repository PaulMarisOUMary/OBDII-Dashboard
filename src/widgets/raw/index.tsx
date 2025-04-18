import { useEffect, useState } from 'react';
import { useData } from '../../context/data';

const RawDataWidget = () => {
    const { data } = useData();
    const [rawData, setRawData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        setRawData(data);
    }, [data]);

    return (
        <div className="flex flex-col items-center p-4 bg-zinc-900 rounded-xl shadow w-full">
            <div className="w-full max-h-64 overflow-y-auto bg-black rounded p-2">
                <pre className="text-sm text-white">
                    {JSON.stringify(rawData, null, 2)}
                </pre>
            </div>
        </div>
    );
};

RawDataWidget.displayName = 'RawDataWidget';
export default RawDataWidget;
