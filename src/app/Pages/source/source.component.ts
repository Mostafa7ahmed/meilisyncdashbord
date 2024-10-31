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

import { SourceService } from '../../Core/Service/source.service';
import { Source } from '../../Core/Interfaces/source';
@Component({
  selector: 'app-source',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent implements OnInit, OnDestroy {
  sourceData: Source[] = [];
  currentPage = 1;
  totalPages = 1;
  movenext :boolean=true;
  movePrevious :boolean=false;
  totalPagesArray: number[] = [];
  unsub: Subscription | undefined;
  pageSize = 5;
  search = '';
  sourceForm = this.createFormGroup();
  editsource = this.createEditFormGroup();
  isloading: boolean = false;
  limits = [10, 20, 40 , 80, 100];
  loading:boolean=false;
  constructor(private sourceService: SourceService , private _toast:ToastesService , ) {}

  private createFormGroup(): FormGroup {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      database: new FormControl(null, Validators.required),
      type: new FormControl(0),

    });
  }

  private createEditFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      label: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      database: new FormControl('', Validators.required),
      type: new FormControl(0),

    });
  }

  getData(page: number = this.currentPage): void {
    this.loading = true;

    this.unsub = this.sourceService
      .getAll(page, this.pageSize, this.search)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.handleGetDataSuccess(res);
          this.loading = false;


        },
        error: (err) => console.error('Error fetching data:', err),
      });
  }

  private handleGetDataSuccess(res: {
    items: Source[];
    currentPage: number;
    totalPages: number;
    moveNext: boolean;
    movePrevious: boolean;
  }): void {
    this.sourceData = res.items;
    this.currentPage = res.currentPage;
    this.totalPages = res.totalPages;
    this.movenext = res.moveNext;
    this.movePrevious = res.movePrevious;
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  editSource(id: string): void {

    this.togglePopupEdit();
    this.sourceService.getSourceById(id).subscribe({
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

  private populateEditForm(data: Source): void {
    this.editsource.setValue({
      id: data.id,
      label: data.label,
      url: data.url,
      database: data.database,
      type:0
    });
  }

  updateSource(): void {
    this.isloading = true;

    if (this.editsource.valid) {
      this.sourceService.updateSource(this.editsource.value).subscribe({
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

  private handleUpdateSuccess(res: Source): void {
    this.isloading = true;
    const index = this.sourceData.findIndex((item) => item.id === res.id);
    if (index !== -1) {
      this.sourceData[index] = res;

    }
  }

  addSource(data: FormGroup): void {
    this.isloading = true;
    if (data.valid) {
      const formData = { ...data.value, type: 0 };
      this.sourceService.addSource(formData).subscribe({
        next: (res) => {
          this.handleAddSuccess(res);
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
  
  EditSource(data: FormGroup): void {
    this.isloading = true;
    if (data.valid) {
      this.isloading = false;
     this.togglePopup();
      this._toast.showToast("success" ,"Done")
    }
  }


  private handleAddSuccess(res: Source): void {
    this.resetForm();
  }

  resetForm(): void {
    this.sourceForm.reset({ label: '', url: '', type: 0, database: '' });
  }
  deleteSource(id: string): void {
    
    this.sourceService.deleteSource(id).subscribe({
      next: (res) => {
        this.sourceData = this.sourceData.filter((item) => item.id !== id);
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

  searchSource(): void {
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
