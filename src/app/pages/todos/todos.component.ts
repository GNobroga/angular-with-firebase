import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TodosFirebaseService } from '../../services/todos-firebase.service';
import { AsyncPipe } from '@angular/common';
import { Todos } from '../../models/todos.model';
import { Subscription, from, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.sass'
})
export class TodosComponent implements OnInit {

  @ViewChild('text')
  public inputText!: ElementRef<HTMLInputElement>;

  authService = inject(AuthService);
  todosService = inject(TodosFirebaseService);
  todos = signal([] as Todos[])
  subscription!: Subscription;

  currentFilter = signal<'Todas' | 'Ativas' | 'Completadas'>('Todas');

  public ngOnInit() {
    this.subscription = this.todosService.getTodos('Todas').subscribe(this.todos.set);
  }

  public changeFilter(filter: 'Todas' | 'Ativas' | 'Completadas') {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.currentFilter.set(filter);
    this.subscription = this.todosService.getTodos(filter).subscribe(this.todos.set);
  }

  public async addTask(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const textValue = this.inputText.nativeElement.value;
      if (textValue.trim()) {
        await this.todosService.add(textValue);
      }
    }
  }

  public async markTodo(id: string, status: boolean) {
    await this.todosService.update(id, status);
  }

  public async deleteTodo(id: string) {
    await this.todosService.remove(id);
  }
}
