import { ToastesService } from './../../Core/Service/toastes.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Meilesearch } from '../../Core/Interfaces/meilesearch';
import { Iuser } from '../../Core/Interfaces/iuser';
import { UserService } from '../../Core/Service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnDestroy ,OnInit {
  userData: Iuser[] = [];
  currentPage = 1;
  totalPages = 1;
  movenext :boolean=true;
  movePrevious :boolean=false;
  totalPagesArray: number[] = [];
  unsub: Subscription | undefined;
  pageSize = 5;
  search = '';
  meilForm = this.createFormGroup();
  editmelie = this.createEditFormGroup();
  isloading: boolean = false;
  limits = [10, 20, 40 , 80, 100];
  loading:boolean=false;
  constructor(private _userService: UserService , private _toast:ToastesService , ) {}

  private createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    });
  }

  private createEditFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  getData(page: number = this.currentPage): void {
    this.loading = true;

    this.unsub = this._userService
      .getAll(page, this.pageSize, this.search)
      .subscribe({
        next: (res) => {
          this.handleGetDataSuccess(res);
          this.loading = false;
          console.log(res)


        },
        error: (err) => console.error('Error fetching data:', err),
      });
  }

  private handleGetDataSuccess(res: {
    items: Iuser[];
    currentPage: number;
    totalPages: number;
    moveNext: boolean;
    movePrevious: boolean;
  }): void {
    this.userData = res.items;
    this.currentPage = res.currentPage;
    this.totalPages = res.totalPages;
    this.movenext = res.moveNext;
    this.movePrevious = res.movePrevious;
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  editUser(id: string): void {

    this.togglePopupEdit();
    this._userService.getUserById(id).subscribe({
      next: (res) =>{ 
        this.populateEditForm(res.result)
        

      },
      error: (err) =>   this._toast.showToast("error" , err.error.message)
      ,
    });
  }

  onLimitChange(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.getData(this.currentPage);
  }

  private populateEditForm(data: Meilesearch): void {
    this.editmelie.setValue({
      id: data.id,
      label: data.label,
      url: data.url,
      apiKey: data.apiKey,
    });
  }

  updateUser(): void {
    this.isloading = true;

    if (this.editmelie.valid) {
      this._userService.updateUser(this.editmelie.value).subscribe({
        next: (res) => {
          this.handleUpdateSuccess(res);
          this.isloading = false;
          this.togglePopupEdit();
          this._toast.showToast("success" , res.message)
          this.getData(this.currentPage);
        },
        error: (err) =>{
          this._toast.showToast("error" , err.error.message)

        },      });
    }
  }

  private handleUpdateSuccess(res: Iuser): void {
    this.isloading = true;
    const index = this.userData.findIndex((item) => item.id === res.id);
    if (index !== -1) {
      this.userData[index] = res;

    }
  }

  addMeili(data: FormGroup): void {
    this.isloading = true;
    if (data.valid) {
      this._userService.addUser(data.value).subscribe({
        next: (res) => {
          this.handleAddSuccess(res, data);
          this.isloading = false;
          this.togglePopup();
          this._toast.showToast("success" , res.message)
          this.getData(this.currentPage);
        },
        error: (err) =>{
          this._toast.showToast("error" , err.error.message)
          this.isloading = false;

        },
      });
    }
  }
  



  private handleAddSuccess(res: Meilesearch, data: FormGroup): void {
    data.reset();
  }

  deleteMeili(id: string): void {
    
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this.userData = this.userData.filter((item) => item.id !== id);
        this.getData(this.currentPage);
        this._toast.showToast("success" , res.message)

      },
      error: (err) =>  this._toast.showToast("error" , err.error.message)
      ,
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getData(page);
    }
  }

  searchMeili(): void {
    this.currentPage = 1;
    this.getData(this.currentPage);
  }

  // Popup
  @ViewChild('popupAdd') popupAdd: ElementRef | undefined;
  @ViewChild('popupEdit') popupEdit: ElementRef | undefined;
  
  togglePopup() {
    if (this.popupAdd) {
      this.popupAdd.nativeElement.classList.toggle('show');
    }
    
  }
  
  togglePopupEdit() {
    if (this.popupEdit) {
      this.popupEdit.nativeElement.classList.toggle('editPop');
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unsub) {
      this.unsub.unsubscribe();
    }
  }

}
