export interface ITaskAPIResponce {
  id: number,
  title: string,
  isDone: boolean,
  todolist_id: number,
  createdAt: string,
  updatedAt: string
}

export interface IMessageAPIResponce {
  message: string,
  id: string
}

export interface IChangeNameAPIResponce {
  message: string,
  title: string
}

export interface ICreateTodolistsAPIResponce {
  id: number,
  title: string,
  user_id: number,
  updatedAt: string,
  createdAt: string
}
