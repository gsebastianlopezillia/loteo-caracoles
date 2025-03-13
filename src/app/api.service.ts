import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiUrl = "https://script.google.com/macros/s/AKfycbzOm6EsZ9nTaHQkxNTRpE-C9kMmWqAQ1H374SVC5LJJiGAx7dnpXZg95c4NN8dVh5k7/exec"; // Ruta del proxy

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de los lotes
  getLotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
