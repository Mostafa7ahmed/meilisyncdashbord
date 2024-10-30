import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor() { }
  
  confirmDeletion(): Promise<boolean> {
    return Swal.fire({
      title: "Sure you want to delete?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#CC59CD",
      cancelButtonColor: "#d33",
     confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, cancel"
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
