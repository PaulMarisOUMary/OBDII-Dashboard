import { useEffect, useState } from 'react';
import { loadedWidgets } from '../widgets';
import { useData } from '../context/data';

import gearIcon from '../assets/svg/gear.svg';

function Dashboard() {
    const { data, bridge } = useData();

    interface WidgetConfig {
        id: number;
        widget: string;
        config?: {
            dataSource: string;
            [key: string]: any;
    };
}

    const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>([
        { id: 0, widget: 'RawDataWidget' },
        {
            id: 1,
            widget: 'GaugeWidget',
            config: { dataSource: 'VEHICLE_SPEED', min: 0, max: 255, unit: 'km/h' },
        },
        {
            id: 2,
            widget: 'GaugeWidget',
            config: { dataSource: 'ENGINE_SPEED', min: 0, max: 6500, unit: 'RPM' },
        },
        {
            id: 3,
            widget: 'NumericWidget',
            config: { dataSource: 'ENGINE_COOLANT_TEMP', unit: '°C' },
        },
        {
            id: 4,
            widget: 'ProgressBarWidget',
            config: { dataSource: 'ENGINE_LOAD', min: 0, max: 100 },
        },
        {
            id: 5,
            widget: 'GraphWidget',
            config: { dataSource: 'ENGINE_COOLANT_TEMP', maxDataPoints: 25 },
        },
    ]);

    const [editingWidgetId, setEditingWidgetId] = useState<number | null>(null);
    const [tempConfig, setTempConfig] = useState<Record<string, any>>({});

    useEffect(() => {
        const requested = widgetConfigs
            .filter((w) => w.config?.dataSource)
            .map((w) => w.config!.dataSource);

        widgetConfigs.forEach((w) => {
            const ds = w.config?.dataSource;
            if (ds && !(ds in data)) {
                bridge.watchKey(ds);
            }
        });

        Object.keys(data).forEach((key) => {
            if (!requested.includes(key)) {
                bridge.unwatchKey(key);
            }
        });
    }, [widgetConfigs, data, bridge]);

    const handleEdit = (id: number, currentConfig?: Record<string, any>) => {
        if (!currentConfig) return;
        setEditingWidgetId(id);
        setTempConfig({ ...currentConfig });
    };

    const handleSave = (id: number) => {
        if (!tempConfig.dataSource || typeof tempConfig.dataSource !== 'string') {
            console.warn('Missing or invalid dataSource');
            return;
        }

        setWidgetConfigs((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, config: { ...tempConfig } as WidgetConfig["config"] } : w
            )
        );
        setEditingWidgetId(null);
    };

    const handleChange = (key: string, value: string) => {
        setTempConfig((prev) => ({
            ...prev,
            [key]: isNaN(Number(value)) || value.trim() === '' ? value : Number(value),
        }));
    };

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full p-4">
            {widgetConfigs.map(({ id, widget, config }) => {
                const WidgetComponent = loadedWidgets.find(
                    (w) => w.Component.displayName === widget || w.Component.name === widget
                )?.Component;

                if (!WidgetComponent) return null;

                const isEditing = editingWidgetId === id;

                return (
                    <div
                        key={id}
                        className="group relative p-4 bg-zinc-900 rounded shadow flex justify-center items-center"
                        style={{ minHeight: '200px' }}
                    >
                        {!isEditing && config && (
                            <button
                                onClick={() => handleEdit(id, config)}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-white bg-zinc-800 hover:bg-zinc-700 p-1.5 rounded shadow-md z-10"
                            >
                                <img src={gearIcon} alt="Settings" className="h-5 w-5 invert" />
                            </button>
                        )}

                        {isEditing && config ? (
                            <div className="w-full text-white text-sm space-y-3">
                                {Object.entries(tempConfig).map(([key, value]) => (
                                    <div key={key}>
                                        <label className="block mb-1">{key}</label>
                                        <input
                                            type={typeof value === 'number' ? 'number' : 'text'}
                                            value={tempConfig[key]}
                                            onChange={(e) =>
                                                handleChange(key, e.target.value)
                                            }
                                            className="w-full p-2 rounded bg-zinc-800"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        onClick={() => setEditingWidgetId(null)}
                                        className="absolute top-1 right-1 z-50 flex items-center justify-center w-8 h-8 rounded hover:bg-black/30"
                                    >
                                        <span className="relative text-xl leading-none -translate-y-px">&times;</span>
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                                        onClick={() => handleSave(id)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full">
                                <div className="w-full flex justify-center items-center">
                                    <WidgetComponent config={config} />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;
