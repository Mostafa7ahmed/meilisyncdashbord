import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Toast {
  message: string;
  color: string;
  isTrue: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, color: string, isTrue: boolean) {
    this.toastSubject.next({ message, color, isTrue });

    
  }

  hideToast() {
    this.toastSubject.next({ message: '', color: '', isTrue: false });
  }
}
