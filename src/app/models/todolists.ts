export type FilterType = 'active' | 'all' | 'done'

export interface ITodolist {
  id: number,
  title: string,
  filter: FilterType
}

