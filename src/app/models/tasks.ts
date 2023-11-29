export interface ITask {
  id: string,
  title: string,
  isDone: boolean
}

export interface ITasks {
  [key: string]: ITask[]
}
