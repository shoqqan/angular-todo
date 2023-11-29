import {Component} from '@angular/core';
import {todolists} from './data/todolists'
import {tasks} from './data/tasks'
import {ITodolist} from "./models/todolists";
import {ITasks} from "./models/tasks";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todolists: ITodolist[] = todolists
  tasks: ITasks = tasks
}
