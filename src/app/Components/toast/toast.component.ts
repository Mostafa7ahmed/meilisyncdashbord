import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastService } from '../../Core/Service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

     

  @Input() colorfill: string = "";
  @Input() message: string = "Error Message"; // تأكد من أن اسم الخاصية هو "message" وليس "Message"
  @Input() isTrue: boolean = false;

  showToast: boolean = false;

  ngOnInit(): void {
    if (this.isTrue) {
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3000); 
    }
  }

  hideToast() {
    this.showToast = false;
  }
}
