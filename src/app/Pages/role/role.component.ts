import { UserComponent } from './../user/user.component';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastesService } from '../../Core/Service/toastes.service';
import { RoleService } from '../../Core/Service/role.service';
import { IRole } from '../../Core/Interfaces/irole';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule , UserComponent],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnDestroy ,OnInit {


  scrollInterval: any;
  scrollAmount = 20;

  @ViewChild('rolesContainer') rolesContainer!: ElementRef; 
  @ViewChild('leftArrow') leftArrow!: ElementRef; 
  @ViewChild('rightArrow') rightArrow!: ElementRef;
  selectedColor: string = '#CC59CD'; 

  startScrolling(direction: 'left' | 'right'): void {
    const scrollStep = direction === 'left' ? -this.scrollAmount : this.scrollAmount;

    this.scrollInterval = setInterval(() => {
      this.rolesContainer.nativeElement.scrollLeft += scrollStep;

      const scrollLeft = this.rolesContainer.nativeElement.scrollLeft;
      const scrollWidth = this.rolesContainer.nativeElement.scrollWidth;
      const clientWidth = this.rolesContainer.nativeElement.clientWidth;

      console.log(`ScrollLeft: ${scrollLeft}, ClientWidth: ${clientWidth}, ScrollWidth: ${scrollWidth}`);

      this.leftArrow.nativeElement.disabled = scrollLeft <= 0;

      if(scrollLeft <= 0){
        this.stopScrolling(); 

      }

      if (scrollLeft + clientWidth >= scrollWidth )  {
        this.rightArrow.nativeElement.disabled = true; 
        this.stopScrolling(); 
      } else {
        this.rightArrow.nativeElement.disabled = false;
      }
    }, 100);
  }

  stopScrolling(): void {
    clearInterval(this.scrollInterval);
  }


  roleData: IRole[] = [];
  currentPage = 1;
  totalPages = 1;
  movenext :boolean=true;
  movePrevious :boolean=false;
  totalPagesArray: number[] = [];
  unsub: Subscription | undefined;
  pageSize = 10;
  search = '';
  isloading:boolean = false;
  constructor(private roleservice: RoleService , private _toast:ToastesService , ) {}

  roleForm = this.createFormGroup();
  
  private createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),



    });
  }


  getData(page: number = this.currentPage): void {
    this.isloading= true;
    this.unsub = this.roleservice.getAll(page, this.pageSize, this.search)
      .subscribe({
        next: (res) => {
          this.roleData=res.items
          this.isloading= false
          console.log(res)
        },
        error: (err) => console.error('Error fetching data:', err),
      });
  }


  
  searchRole(){
    this.currentPage = 1;
    this.getData(this.currentPage);
  }


  addRole(data: FormGroup): void {
    this.isloading = true;
    this.roleservice.addRole(data.value).subscribe({
      next: (res) => {
        this.handleAddSuccess(data);
        this.isloading = false;
        this.togglePopup();
        this._toast.showToast("success" , res.message)
        this.getData(this.currentPage);
      },
      error: (err) =>{
        console.log(err)
        this._toast.showToast("error" , err.message)
        this.isloading = false;

      },
    });
  }
  



  private handleAddSuccess(data: FormGroup): void {
    data.reset();
  }










    // Popup
    @ViewChild('popupAdd') popupAdd: ElementRef | undefined;
    
    togglePopup() {
      if (this.popupAdd) {
        this.popupAdd.nativeElement.classList.toggle('show');
      }
  
      
    }





  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    this.stopScrolling();
  }
}
