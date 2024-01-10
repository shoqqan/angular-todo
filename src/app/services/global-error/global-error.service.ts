import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {
  private errorMessage = '';

  public get error() {
    return this.errorMessage;
  }

  public set error(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
