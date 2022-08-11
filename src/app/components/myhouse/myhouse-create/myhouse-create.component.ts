import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HouseService} from "../../../services/house.service";
import {CategoryService} from "../../../services/category.service";
import {NgToastService} from "ng-angular-popup";
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from "rxjs";
import {ImageService} from "../../../services/image.service";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {House} from "../../../models/house";
import {Image} from "../../../models/image";
import {NzMessageService} from "ng-zorro-antd/message";
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-myhouse-create',
  templateUrl: './myhouse-create.component.html',
  styleUrls: ['./myhouse-create.component.css']
})
export class MyhouseCreateComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  houseForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    address: new FormControl(),
    bedroom: new FormControl(),
    bathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    status: new FormControl(1)
  })
  house!: House;
  listCategories: Category[] = [];

  constructor(private houseService: HouseService,
              private categoryService: CategoryService,
              private router: Router,
              private storage: AngularFireStorage,
              private imageService: ImageService,
              private toast: NgToastService,) {
  }


  ngOnInit(): void {
    this.showAllCategories()
  }

  showAllCategories() {
    this.categoryService.findAll().subscribe((categories) => {
      this.listCategories = categories;
    }, error => {
      console.log(error)
    })
  }

  idHouseImage: any;
  image: any;

  add() {
    // @ts-ignore
    const ownerId = localStorage.getItem('ID') ? parseInt(localStorage.getItem('ID')) : 0;
    this.house = {
      name: this.houseForm.value.name,
      category: {
        id: +this.houseForm.value.categoryId
      },
      address: this.houseForm.value.address,
      bedroom: this.houseForm.value.bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      price: this.houseForm.value.price,
      owner: {
        id: ownerId
      },
      status: this.houseForm.value.status,
      avatarHouse: this.images[0].image,
      images: this.images,

    }
    this.toast.success({detail:"Notification", summary:"House created successfully", duration:3000});
    this.houseService.save(this.house).subscribe((house) => {
      this.router.navigate(['']);
    } , error => {
      this.toast.error({detail:"Notification", summary:"House created failed", duration:3000});
    });
  }


  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  selectedImages: any[] = [];
  images: Image[] = []

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
              console.log(url);
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

  // handleChange(info: NzUploadChangeParam): void {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     this.msg.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     this.msg.error(`${info.file.name} file upload failed.`);
  //   }
  // }

}
