import {Pipe, PipeTransform} from '@angular/core';
import {ITask} from "../models/tasks";
import {FilterType} from "../models/todolists";

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(value: ITask[], filter: FilterType): ITask[] {
    switch (filter) {
      case "all":
        return value;
      case "done":
        return value.filter(el => el.isDone)
      case "active":
        return value.filter(el => !el.isDone)
    }
  }

}
