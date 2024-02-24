import { Component, OnInit, TrackByFunction, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  // #firestore = inject(Firestore);

  // tasks = signal<Task[]>([]);

  // public ngOnInit(): void {

  //   const q = query(collection(this.#firestore, 'tasks'));



  //   onSnapshot(q, querySnapshot => {
  //     querySnapshot.docs.map(doc => doc.data).forEach((doc) => doc && console.log(doc()))
  //   });

  // }

  // public trackByTask(index: number, task: Task) {
  //   return index;
  // }

  // public async addTask(name: string) {
  //   try {
  //     await addDoc(collection(this.#firestore, 'tasks'), { name, done: false });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // public async deleteTask(id: string) {
  //   await deleteDoc(doc(this.#firestore, 'tasks', id));
  // }


}

interface Task {
  id: string;
  name: string;
  done: boolean;
}
