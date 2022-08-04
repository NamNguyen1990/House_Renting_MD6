import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {HouseService} from "../../../services/house.service";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

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

  listCategory:Category[] = [];


  id: any;
  constructor(private houseService: HouseService,
              private router:Router,
              private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');

      const product = this.getHouse(this.id);
      // @ts-ignore
      this.productForm.setValue(product);
    });
  }

  ngOnInit(): void {

    this.categoryService.findAll().subscribe((data)=>{
      console.log(data)
      this.listCategory = data;
    })
  }

  getHouse(id: number) {
    return this.houseService.findById(id).subscribe(data =>{
      this.houseForm = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        categoryId: new FormControl(data.category.id),
        address: new FormControl(data.address),
        bedroom: new FormControl(data.bedroom),
        bathroom: new FormControl(data.bathroom),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
        avatarHouse: new FormControl(data.avatarHouse)
      })
      this.fb = data.avatarHouse
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
      bedroom: this.houseForm.value. bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      status: this.houseForm.value.status,
      owner: {
        id: localStorage.getItem("ID")
      },
      avatarHouse: this.fb
    }
    this.houseService.update(id, this.obj).subscribe(() => {
      // this.router.navigate(['/product/list']);
      alert('Cập nhật thành công');
    }, error => {
      console.log(error);
    });
  }


  fb: any;
  downloadURL: any;
  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
