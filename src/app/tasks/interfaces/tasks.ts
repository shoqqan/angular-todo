export interface Task {
  id: number,
  title: string,
  isDone: boolean
}

export interface ITasks {
  [key: number]: Task[];
}
