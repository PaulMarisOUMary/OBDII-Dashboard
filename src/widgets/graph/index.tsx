import { useEffect, useRef, useState } from 'react';
import { useData } from '../../context/data';

interface GraphWidgetProps {
    config: {
        dataSource: string;
        maxDataPoints?: number;
    };
}

const GraphWidget = ({ config }: GraphWidgetProps) => {
    const { data } = useData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [dataPoints, setDataPoints] = useState<number[]>([]);

    const maxDataPoints = config.maxDataPoints ?? 50;

    const updateDataPoints = (newValue: number) => {
        setDataPoints((prevData) => {
            const updatedData = [...prevData, newValue];
            if (updatedData.length > maxDataPoints) {
                updatedData.shift();
            }
            return updatedData;
        });
    };

    useEffect(() => {
        const value = data[config.dataSource] ?? 0;
        updateDataPoints(value);
    }, [data[config.dataSource]]);

    const drawGraph = (ctx: CanvasRenderingContext2D, dataPoints: number[]) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#4ade80';

        const step = width / (dataPoints.length - 1 || 1);

        dataPoints.forEach((value, index) => {
            const x = index * step;
            const y = height - ((value / 255) * height);

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawGraph(ctx, dataPoints);
            }
        }
    }, [dataPoints]);

    return (
        <div className="flex flex-col items-center p-4 bg-zinc-900 rounded-xl shadow w-full h-full">
            <canvas
                ref={canvasRef}
                width="225%"
                height="100%"
                className="bg-zinc-800 rounded"
            />
        </div>
    );
};

export default GraphWidget;