import { Injectable, OnInit, inject, signal } from '@angular/core';
import {
  Firestore,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Todos } from '../models/todos.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodosFirebaseService {
  #firestore = inject(Firestore);
  #authService = inject(AuthService);
  #todosCollection = collection(this.#firestore, 'todos');


  public getTodos(filter: 'Todas' | 'Ativas' | 'Completadas') {
    const filters: { [key: string]: QueryFieldFilterConstraint } = {
      Ativas: where('isCompleted', '!=', true),
      Completadas: where('isCompleted', '==', true),
    };

    let consult = query(
      this.#todosCollection,
      where('userId', '==', this.#authService.currentUser?.uid),
    );

    if (filters[filter]) {
      consult = query(
        this.#todosCollection,
        where('userId', '==', this.#authService.currentUser?.uid),
        filters[filter]
      );
    }

    return collectionData(consult, { idField: 'id' }) as Observable<Todos[]>;
  }

  public async add(text: string) {
    const todoToCreate = { text, isCompleted: false, userId: this.#authService.currentUser?.uid };
    const data = await addDoc(this.#todosCollection, todoToCreate);
    return of(data);
  }

  public async remove(id: string) {
    await deleteDoc(doc(this.#firestore, `todos/${id}`));
  }

  public async update(id: string, status: boolean) {
    await updateDoc(doc(this.#firestore, `todos/${id}`), {
      isCompleted: status,
    });
  }
}
