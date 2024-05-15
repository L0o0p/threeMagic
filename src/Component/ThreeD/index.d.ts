export type RenderItem = {
    [key: string]: {
        id: string;
        position: {
            x: number;
            y: number;
            z: number;
        };
    } | undefined;
};