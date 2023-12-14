export interface ITask {
  id: number,
  title: string,
  isDone: boolean
}

export interface ITasks {
  [key: number]: ITask[];
}
