import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {HouseService} from "../../../services/house.service";
import {CategoryService} from "../../../services/category.service";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-myhouse-create',
  templateUrl: './myhouse-create.component.html',
  styleUrls: ['./myhouse-create.component.css']
})
export class MyhouseCreateComponent implements OnInit {

  houseForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    bedroom: new FormControl(''),
    bathroom: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    categoryId: new FormControl(''),
    ownerId: new FormControl(''),
    status: new FormControl('1')

  })
  obj: any;

  listCategory: Category[] = [];

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private houseService: HouseService,
              private categoryService: CategoryService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((data) => {
      console.log(data)
      this.listCategory = data;
    })
  }

  submit() {
    console.log(this.houseForm.value)
    this.obj = {
      name: this.houseForm.value.name,
      category: {
        id: this.houseForm.value.categoryId
      },
      address: this.houseForm.value.address,
      bedroom: this.houseForm.value.bedroom,
      bathroom: this.houseForm.value.bathroom,
      description: this.houseForm.value.description,
      price: this.houseForm.value.price,
      status: this.houseForm.value.status,
      owner: {
        id: localStorage.getItem("ID")
      },
    }
    this.houseService.save(this.obj).subscribe(() => {
      this.toast.success({detail: "Notification", summary: "More successful houses", duration: 3000});
    }, error => {
      this.toast.error({detail: "Notification", summary: "More failed houses", duration: 3000});
    })
  }
}
