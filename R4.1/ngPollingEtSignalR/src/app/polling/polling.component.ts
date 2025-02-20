import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { last, lastValueFrom, takeLast } from 'rxjs';
import { UselessTask } from '../models/UselessTask';


@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [MatCheckbox,MatCardContent,MatCard,MatFormField,FormsModule,MatLabel,CommonModule,MatInput,MatButtonModule],
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {
  apiUrl = "https://localhost:7289/api/";
  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.updateTasks();
  }

  async complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    let x = await lastValueFrom(this.http.get<any>(this.apiUrl + "UselessTasks/Complete/" + id))
    console.log(x)
  }

  async addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)
    this.tasks.push( await lastValueFrom(this.http.post<UselessTask>(this.apiUrl + "UselessTasks/Add?taskText=" + this.taskname, null )))
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    this.tasks = await lastValueFrom(this.http.get<UselessTask[]>(this.apiUrl+"UselessTasks/GetAll"))

    setTimeout(() => {this.updateTasks()}, 1000)
  }
}
