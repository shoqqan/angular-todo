// export type FilterType = 'active' | 'all' | 'done'

export enum FilterType {
  ACTIVE = 'active',
  ALL = 'all',
  DONE = 'done'
}

export interface Todolist {
  id: number,
  title: string,
  filter: FilterType
}

