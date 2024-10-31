import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meilesearch } from '../../Core/Interfaces/meilesearch';
import { Source } from '../../Core/Interfaces/source';
import { Isync } from '../../Core/Interfaces/isync';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SyncService } from '../../Core/Service/sync.service';
import { MeilesearchService } from '../../Core/Service/meilesearch.service';
import { SourceService } from '../../Core/Service/source.service';
import { ToastesService } from '../../Core/Service/toastes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sync',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
})
export class SyncComponent  implements OnInit , OnDestroy{
  syncData: Isync[] = [];
  meiliData: Meilesearch[] = [];
  sourceData: Source[] = [];
  isloading: boolean = false;
  limits = [10, 20, 40, 80, 100];
  loading: boolean = false;
  currentPage = 1;
  totalPages = 1;
  movenext :boolean=true;
  movePrevious :boolean=false;
  totalPagesArray: number[] = [];
  unsub: Subscription | undefined;
  pageSize = 5;
  search = '';

  syncForm = this.createFormGroup();
  editsync = this.createEditFormGroup();


  private createFormGroup(): FormGroup {
    return new FormGroup({
      label: new FormControl(null, Validators.required),
      sourceId: new FormControl(null, Validators.required),
      meiliSearchId: new FormControl(null, Validators.required),
    });
  }

  private createEditFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      label: new FormControl('', Validators.required),
      sourceId: new FormControl('', Validators.required),
      meiliSearchId: new FormControl('', Validators.required),

    });
  }
  constructor( private _AsynService: SyncService,  private _MeilisearchService: MeilesearchService, private _SourceService: SourceService,  private _toast: ToastesService) {}


  // Fetch paginated data
  getData(pageNumber: number = this.currentPage) {
    this.loading = true;
    this._AsynService.getAll(pageNumber, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.syncData = res.items;
      this.handleGetDataSuccess(res)
      this.loading = false;
      console.log(res)


      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
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

  getDataSource(pageNumber: number = 1) {
    this._SourceService.getAll(pageNumber).subscribe({
      next: (res) => {
        this.sourceData = res.items;
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  getDataMeliesearch(pageNumber: number = 1, search: string = "") {
    this._MeilisearchService.getAll(pageNumber, this.pageSize , search).subscribe({
      next: (res) => {
        this.meiliData = res.items;
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  // Initialize form for editing





  // Initialize form for editing

  editSync(id: string) {
    this.togglePopupEdit();

    this._AsynService.getSynceById(id).subscribe({
      next: (res) => {
        this.populateEditForm(res.result)
      },
      error: (err) => {
        console.error('Error fetching data for edit:', err);
      },
    });
  }

  
  private populateEditForm(data: Isync): void {
    this.editsync.setValue({
      id: data.id,
      label: data.label,
      sourceId: data.source.id,
      meiliSearchId: data.meiliSearch.id,
    });
  }

  // Update product details
  updateSync(): void {
    this.isloading = true;

    if (this.editsync.valid) {
      this._AsynService.updateSynce(this.editsync.value).subscribe({
        next: (res) => {
          this.handleUpdateSuccess(res);
          this.togglePopupEdit();
          this._toast.showToast("success" , res.message)
          this.getData(this.currentPage);
          this.getData(this.currentPage);
          this.isloading = false;

        },
        error: (err) => {
          console.error('Error updating item:', err);
        },
      });
    }
  }

  private handleUpdateSuccess(res: Isync): void {
    const index = this.syncData.findIndex((item) => item.id === res.id);
    if (index !== -1) {
      this.syncData[index] = res;

    }
  }


  addSync(data:FormGroup) {

    this.isloading = true;
    if (data.valid) {
      this._AsynService.addSynce(data.value).subscribe({
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

  // Delete a MeiliSearch instance
  deleteSource(id: string): void {
    
    this._AsynService.deleteSynce(id).subscribe({
      next: (res) => {
        this.syncData = this.syncData.filter((item) => item.id !== id);
        this.getData(this.currentPage);
        this._toast.showToast("success" , res.message)

      },
      error: (err) =>  this._toast.showToast("error" , err.error.message)
      ,
    });
  }

  private handleAddSuccess(res: Meilesearch, data: FormGroup): void {
    data.reset();
  }




  callGet() {
    this.getDataMeliesearch(this.currentPage);
    this.getDataSource(this.currentPage);
  }








  // Change pagination page


  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getData(page);
    }
  }




  //Search

  searchSync(): void {
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
    this.callGet()

    
  }
  
  togglePopupEdit() {
    if (this.popupEdit) {
      this.popupEdit.nativeElement.classList.toggle('editPop');
    }
    this.callGet()

  }




  onLimitChange(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.getData(this.currentPage);
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
