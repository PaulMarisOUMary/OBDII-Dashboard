import { motion } from 'motion/react';
import { useData } from '../../context/data';

interface GaugeWidgetProps {
    config: {
        dataSource: string;
        min: number;
        max: number;
        unit: string;
    };
}

export const GaugeWidget = ({ config }: GaugeWidgetProps) => {
    const { data } = useData();

    const value = data[config.dataSource] ?? 0;

    const clampedValue = Math.min(Math.max(value, config.min), config.max);
    const angle = ((clampedValue - config.min) / (config.max - config.min)) * 180 - 90;

    return (
        <div className="relative w-64 h-32">
            {/* Gauge background */}
            <div className="absolute w-full h-full rounded-t-full bg-zinc-800 border-3 border-zinc-700" />

            {/* Needle */}
            <motion.div
                className="absolute left-1/2 bottom-0 w-0.5 h-28 bg-red-500 origin-bottom z-10"
                animate={{ rotate: angle }}
                transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            />

            {/* Needle base circle */}
            <div className="absolute left-1/2 bottom-0 w-4 h-4 z-20 bg-zinc-300 rounded-full -translate-x-1/2 translate-y-1/2 border border-zinc-700" />

            {/* Label displaying the value */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
                {Math.round(clampedValue)} {config.unit}
            </div>
        </div>
    );
};

GaugeWidget.displayName = 'GaugeWidget';
export default GaugeWidget;
