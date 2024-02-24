import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { Todos } from '../models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodosFirebaseService {

  #firestore = inject(Firestore);
  #todosCollection = collection(this.#firestore, 'todos');

  public getTodos() {
    return collectionData(this.#todosCollection, { idField: 'id' }) as  Observable<Todos[]>;
  }

  async add(text: string) {
    const todoToCreate = { text, isCompleted: false };
    const data = await addDoc(this.#todosCollection, todoToCreate);
    return of(data);
  }
}
