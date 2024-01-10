import { FilterTasksPipe } from './filter-tasks.pipe';
import { Task } from '../../tasks/interfaces/tasks';
import { FilterType } from '../interfaces/todolists';

describe('FilterTasksPipe', () => {
  let filterTasksPipe: FilterTasksPipe;
  beforeEach(() => {
    filterTasksPipe = new FilterTasksPipe();
  });
  it('should create an instance', () => {
    expect(filterTasksPipe).toBeTruthy();
  });
  it('should transform tasks with filter: ALL', () => {
    const fakeTasks: Task[] = [
      {id: 1, isDone: false, title: 'MOCK'},
      {id: 2, isDone: true, title: 'MOCK'},
      {id: 3, isDone: false, title: 'MOCK'},
    ];
    const fakeTasksTransformedALL: Task[] = [
      {id: 1, isDone: false, title: 'MOCK'},
      {id: 2, isDone: true, title: 'MOCK'},
      {id: 3, isDone: false, title: 'MOCK'},
    ];
    const transformed = filterTasksPipe.transform(fakeTasks, FilterType.ALL);
    expect(transformed).toEqual(fakeTasksTransformedALL);
  });
  it('should transform tasks with filter: DONE', () => {
    const fakeTasks: Task[] = [
      {id: 1, isDone: false, title: 'MOCK'},
      {id: 2, isDone: true, title: 'MOCK'},
      {id: 3, isDone: false, title: 'MOCK'},
    ];
    const fakeTasksTransformedDONE: Task[] = [
      {id: 2, isDone: true, title: 'MOCK'},
    ];
    const transformed = filterTasksPipe.transform(fakeTasks, FilterType.DONE);
    expect(transformed).toEqual(fakeTasksTransformedDONE);
  });
  it('should transform tasks with filter: ACTIVE', () => {
    const fakeTasks: Task[] = [
      {id: 1, isDone: false, title: 'MOCK'},
      {id: 2, isDone: true, title: 'MOCK'},
      {id: 3, isDone: false, title: 'MOCK'},
    ];
    const fakeTasksTransformedACTIVE: Task[] = [
      {id: 1, isDone: false, title: 'MOCK'},
      {id: 3, isDone: false, title: 'MOCK'},
    ];
    const transformed = filterTasksPipe.transform(fakeTasks, FilterType.ACTIVE);
    expect(transformed).toEqual(fakeTasksTransformedACTIVE);
  });
});

