import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit  {

     

  @Input() colorfill: string = "";
  @Input() message: string = "Error Message"; 
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
