import { motion } from 'motion/react';
import { useData } from '../../context/data';

interface ProgressBarWidgetProps {
    config: {
        dataSource: string;
        min: number;
        max: number;
    };
}

export const ProgressBarWidget = ({ config }: ProgressBarWidgetProps) => {
    const { data } = useData();

    const rawValue = data[config.dataSource] ?? 0;
    const clampedValue = Math.max(config.min, Math.min(rawValue, config.max));
    const percentage = ((clampedValue - config.min) / (config.max - config.min)) * 100;

    return (
        <div className="w-full max-w-xs">
            <div className="w-full h-6 bg-zinc-800 rounded overflow-hidden shadow-inner">
                <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                    initial={false}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                />
            </div>

            <div className="flex justify-between text-xs text-white/70 mt-1 px-1">
                <span>{config.min}</span>
                <span>{config.max}</span>
            </div>
        </div>
    );
};

ProgressBarWidget.displayName = 'ProgressBarWidget';
export default ProgressBarWidget;
