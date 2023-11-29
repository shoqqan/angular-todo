type FilterType = "active" | "all" | "done"

export interface ITodolist {
  id: string,
  title: string,
  filter: FilterType
}

