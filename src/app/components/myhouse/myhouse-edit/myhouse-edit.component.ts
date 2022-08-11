import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {HouseService} from "../../../services/house.service";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ImageService} from "../../../services/image.service";
import {NgToastService} from "ng-angular-popup";
import {ResponseBody} from "../../../models/response-body";
import {Image} from "../../../models/image";
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {update} from "@angular/fire/database";

@Component({
  selector: 'app-myhouse-edit',
  templateUrl: './myhouse-edit.component.html',
  styleUrls: ['./myhouse-edit.component.css']
})
export class MyhouseEditComponent implements OnInit {

  houseForm: FormGroup = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    bedroom: new FormControl(),
    bathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    categoryId: new FormControl(),
    ownerId: new FormControl(),
    status: new FormControl(),
    avatarHouse: new FormControl(),
  });
  obj: any;
  listCategory: Category[] = [];
  id: any;
  image: any;
  idHouseImage: any;
  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  selectedImages: any[] = [];
  images: Image[] = []

  constructor(private houseService: HouseService,
              private toast: NgToastService,
              private imageService: ImageService,
              private router: Router,
              private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private modal: NzModalService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getHouse(this.id);
    });
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((data) => {
      console.log(data)
      this.listCategory = data;
    })
  }

  getHouse(id: number) {
    this.houseService.findById(id).subscribe(data => {
      this.houseForm = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        categoryId: new FormControl(data?.category?.id),
        address: new FormControl(data.address),
        bedroom: new FormControl(data.bedroom),
        bathroom: new FormControl(data.bathroom),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        avatarHouse: new FormControl(data.avatarHouse)
      });
      this.image = data.avatarHouse;
    });
  }

  update(id: number) {
    this.obj = {
      name: this.houseForm.value.name,
      price: this.houseForm.value.price,
      category: {
        id: this.houseForm.value.categoryId
      },
      address: this.houseForm.value.address,
      bedroom: this.houseForm.value.bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      status: this.houseForm.value.status,
      owner: {
        id: localStorage.getItem("ID")
      },
      avatarHouse: this.images[0].image,
      images: this.images
    }
    this.houseService.update(id, this.obj).subscribe((obj: ResponseBody) => {
      if (obj.code==='99'){
        this.toast.error({detail: "Notification", summary: "Update failed", duration: 3000});
      }else {
        this.toast.success({detail: "Notification", summary: "Update Successfully", duration: 3000});
        this.router.navigate(['/myhouse/list'])
      }
    }, error => {
      this.toast.error({detail: "Notification", summary: "Update failed", duration: 3000});
    });
  }

  onFileSelected() {
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.images.push({image: url});
              this.toast.info({detail:"Notification", summary: "Please wait a moment", duration:3000});
            });
          })
        ).subscribe();
      }
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages);
    } else {
      this.selectedImages = [];
    }
    this.onFileSelected()
  }

  confirmModal?: NzModalRef; // For testing by now

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure to save this update?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.update(this.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
