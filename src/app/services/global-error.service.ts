import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {
  errorMessage = '';

  setError(errorMessage: string) {
    this.errorMessage = errorMessage;
  }

}
