import { Pipe, PipeTransform } from '@angular/core';
import { FilterType } from '../interfaces/todolists';
import { Task } from '../../tasks/interfaces/tasks';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(value: Task[], filter: FilterType): Task[] {
    switch (filter) {
      case FilterType.ALL:
        return value;
      case FilterType.DONE:
        return value.filter(el => el.isDone);
      case FilterType.ACTIVE:
        return value.filter(el => !el.isDone);
    }
  }

}
