export interface GenericGraphConfig {
    containerID: string;
    containerFill: string;
    height: number;
    width: number;
    xGrid: GridConfig;
    yGrid: GridConfig;
    barWidth: number;
    prevBar: BarConfig;
    nextBar: BarConfig;
}

export interface GridConfig {
    visibility: boolean;
    fill: string;
}

export interface BarConfig {
    fill: string;
    data: Array<DataTemplate>;
}

export interface DataTemplate {
    'x-label': string;
    'y-value': number;
}

export const Data = {
    mtdData: [
        {
            'y-value': 18172.0,
            'x-label': 'A',
        },
        {
            'y-value': 20181.0,
            'x-label': 'B',
        },
        {
            'y-value': 21684.0,
            'x-label': 'C',
        },
        {
            'y-value': 18912.0,
            'x-label': 'D',
        },
        {
            'y-value': 33556.0,
            'x-label': 'E',
        },
        {
            'y-value': 23074.0,
            'x-label': 'F',
        },
        {
            'y-value': 19301.0,
            'x-label': 'G',
        },
        {
            'y-value': 10181.0,
            'x-label': 'H',
        },
        {
            'y-value': 30181.0,
            'x-label': 'I',
        }, {
            'y-value': 30181.0,
            'x-label': 'J',
        }, {
            'y-value': 30181.0,
            'x-label': 'K',
        }, {
            'y-value': 30181.0,
            'x-label': 'L',
        }, {
            'y-value': 30181.0,
            'x-label': 'M',
        }, {
            'y-value': 30181.0,
            'x-label': 'N',
        }, {
            'y-value': 30181.0,
            'x-label': 'O',
        }, {
            'y-value': 30181.0,
            'x-label': 'P',
        }
    ]
};
