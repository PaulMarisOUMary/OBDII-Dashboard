import { useData } from '../../context/data';

interface NumericWidgetProps {
    config: {
        dataSource: string;
        unit: string;
    };
}

export const NumericWidget = ({ config }: NumericWidgetProps) => {
    const { data } = useData();

    const value = data[config.dataSource] ?? 0;

    return (
        <div className="bg-zinc-800 rounded shadow-lg p-4 w-48 text-center relative">
            <p className="text-green-400 text-4xl font-bold">{value}</p>
            <p className="text-white text-sm absolute bottom-2 right-2">{config.unit}</p>
        </div>
    );
};

NumericWidget.displayName = 'NumericWidget';
export default NumericWidget;