import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../../Core/Service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  showToast: boolean = false;
  message: string = "";
  colorfill: string = "";
  isSuccess: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast) => {
      this.message = toast.message;
      this.colorfill = toast.color;
      this.isSuccess = toast.isTrue;
      this.showToast = true;
      setTimeout(() => {
        this.hideToast();
      }, 5000);
    });
  }

  hideToast() {
    this.showToast = false;
  }
}
