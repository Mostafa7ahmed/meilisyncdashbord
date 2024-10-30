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
import { MeilesearchService } from '../../Core/Service/meilesearch.service';
import { Meilesearch } from '../../Core/Interfaces/meilesearch';

@Component({
  selector: 'app-mielesearch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './mielesearch.component.html',
  styleUrls: ['./mielesearch.component.scss'],
})
export class MielesearchComponent implements OnInit, OnDestroy {
  meiliData: Meilesearch[] = [];
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
  constructor(private meilisearchService: MeilesearchService , private _toast:ToastesService , ) {}

  private createFormGroup(): FormGroup {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      apiKey: new FormControl(null, Validators.required),
    });
  }

  private createEditFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      label: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      apiKey: new FormControl('', Validators.required),
    });
  }

  getData(page: number = this.currentPage): void {
    this.loading = true;

    this.unsub = this.meilisearchService
      .getAll(page, this.pageSize, this.search)
      .subscribe({
        next: (res) => {
          this.handleGetDataSuccess(res);
          this.loading = false;


        },
        error: (err) => console.error('Error fetching data:', err),
      });
  }

  private handleGetDataSuccess(res: {
    items: Meilesearch[];
    currentPage: number;
    totalPages: number;
    moveNext: boolean;
    movePrevious: boolean;
  }): void {
    this.meiliData = res.items;
    this.currentPage = res.currentPage;
    this.totalPages = res.totalPages;
    this.movenext = res.moveNext;
    this.movePrevious = res.movePrevious;
    this.totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  editMelie(id: string): void {

    this.togglePopupEdit();
    this.meilisearchService.getMelieById(id).subscribe({
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

  updateMelie(): void {
    this.isloading = true;

    if (this.editmelie.valid) {
      this.meilisearchService.updateMelie(this.editmelie.value).subscribe({
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

  private handleUpdateSuccess(res: Meilesearch): void {
    this.isloading = true;
    const index = this.meiliData.findIndex((item) => item.id === res.id);
    if (index !== -1) {
      this.meiliData[index] = res;

    }
  }

  addMeili(data: FormGroup): void {
    this.isloading = true;
    if (data.valid) {
      this.meilisearchService.addMelie(data.value).subscribe({
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
  
  EditMeili(data: FormGroup): void {
    this.isloading = true;
    if (data.valid) {
      this.isloading = false;
     this.togglePopup();
      this._toast.showToast("success" ,"Done")
    }
  }


  private handleAddSuccess(res: Meilesearch, data: FormGroup): void {
    data.reset();
  }

  deleteMeili(id: string): void {
    
    this.meilisearchService.deleteMelie(id).subscribe({
      next: (res) => {
        this.meiliData = this.meiliData.filter((item) => item.id !== id);
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
