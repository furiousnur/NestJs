export interface Task {
    id: number;
    name: string;
    completed?: boolean;
    description?: string;
    owner?: string;
    duration?: number;
}