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
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  // houseForm = new FormGroup({
  //   name: new FormControl(''),
  //   address: new FormControl(''),
  //   bedroom: new FormControl(''),
  //   bathroom: new FormControl(''),
  //   description: new FormControl(''),
  //   price: new FormControl(''),
  //   categoryId: new FormControl(''),
  //   ownerId: new FormControl(''),
  //   status: new FormControl('1'),
  //   avatarHouse: new FormControl('')
  // })
  // obj: any;
  //
  // listCategory: Category[] = [];
  //
  // constructor(private httpClient: HttpClient,
  //             private activatedRoute: ActivatedRoute,
  //             private houseService: HouseService,
  //             private categoryService: CategoryService,
  //             private toast: NgToastService,
  //             private storage: AngularFireStorage
  // ) {
  // }
  //
  // ngOnInit(): void {
  //   this.categoryService.findAll().subscribe((data) => {
  //     console.log(data)
  //     this.listCategory = data;
  //   })
  // }
  //
  // submit() {
  //   console.log(this.houseForm.value)
  //   this.obj = {
  //     name: this.houseForm.value.name,
  //     category: {
  //       id: this.houseForm.value.categoryId
  //     },
  //     address: this.houseForm.value.address,
  //     bedroom: this.houseForm.value.bedroom,
  //     bathroom: this.houseForm.value.bathroom,
  //     description: this.houseForm.value.description,
  //     price: this.houseForm.value.price,
  //     status: this.houseForm.value.status,
  //     owner: {
  //       id: localStorage.getItem("ID")
  //     },
  //     avatarHouse: this.fb
  //   }
  //   this.houseService.save(this.obj).subscribe(() => {
  //     this.toast.success({detail: "Notification", summary: "More successful houses", duration: 3000});
  //   }, error => {
  //     this.toast.error({detail: "Notification", summary: "More failed houses", duration: 3000});
  //   })
  // }
  //
  // // up load filebase
  // title = "cloudsSorage";
  // selectedFile: any;
  // fb: any;
  // downloadURL: any;
  //
  // onFileSelected(event: any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe((url: any) => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  houseForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    address: new FormControl(),
    bedroom: new FormControl(),
    bathroom: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    status: new FormControl('1')
  })
  house: any;
  listCategories: Category[] = [];

  constructor(private houseService: HouseService,
              private categoryService: CategoryService,
              private router: Router,
              private storage: AngularFireStorage,
              private imageService: ImageService) {
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
    this.house = {
      name: this.houseForm.value.name,
      category: {
        id: this.houseForm.value.categoryId
      },
      address: this.houseForm.value.address,
      bedroom: this.houseForm.value.bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      price: this.houseForm.value.price,
      owner: {
        id: localStorage.getItem('ID')
      },
      status: this.houseForm.value.status,
      avatarHouse: this.images[0]
    }
    this.houseService.save(this.house).subscribe((house) => {
      this.idHouseImage = house.id;
      for (let i = 0; i < this.images.length; i++) {
        this.image = {
          house: {
            id: this.idHouseImage
          },
          image: this.images[i]
        }
        this.imageService.save(this.image).subscribe()
      }
      this.router.navigate(['']);
    })
  }


  title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  selectedImages: any[] = [];
  images: any[] = []

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
              // const image: Image = {
              //   linkImg: url,
              //   postId: data.id
              // };
              // console.log('image', url);
              this.images.push(url);
              // this.imageService.create(image).subscribe(() => {
              //   console.log('SUCCESSFULLY CREATE')
              // });
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
}
