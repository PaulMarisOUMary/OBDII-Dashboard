const widgets = import.meta.glob('../widgets/**/*.{tsx,jsx}', { eager: true });

interface WidgetEntry {
    name: string;
    Component: React.FC<any>;
}

export const loadedWidgets: WidgetEntry[] = Object.entries(widgets).map(([_, module]) => {
    const Component = (module as any).default;
    const name = Component.displayName || Component.name || 'UnknownWidget';

    return { name, Component };
});
