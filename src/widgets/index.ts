const widgets = import.meta.glob('../widgets/**/*.{tsx,jsx}', { eager: true });

interface WidgetEntry {
    name: string;
    Component: React.FC<any>;
}

export const loadedWidgets: WidgetEntry[] = Object.entries(widgets).map(([path, module]) => {
    const name = path
        .split('/')
        .pop()
        ?.replace(/\.(tsx|jsx)$/, '') || 'UnknownWidget';

    return {
        name,
        Component: (module as any).default,
    };
});
