export interface Observation {
    id?: string,
    xCoordinate: number,
    yCoordinate: number,
    weight: number,
    priority: number,
    jMag: number,
    kMag: number,
    comment?: string
}