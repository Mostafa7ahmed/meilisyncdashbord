import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastesService {
  constructor() {}

  showToast(icon: 'success' | 'error', title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      customClass: {
        popup: 'ToastPopup',
        title: 'toasttitle',
        icon: 'custom-toast-icon',
      },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({ icon, title });
  }
}
