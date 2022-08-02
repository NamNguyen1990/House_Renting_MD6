import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import { Category } from 'src/app/models/category';
import {CategoryService} from "../../services/category.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {

  API = 'http://localhost:8888/houses/'

  house: any;

  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data) => {
        this.house = data
      })
    })
  }







  // houseForm: FormGroup = new FormGroup({
  //   name: new FormControl(),
  //   categoryId: new FormControl(),
  //   address: new FormControl(),
  //   bedroom: new FormControl(),
  //   bathroom: new FormControl(),
  //   description: new FormControl(),
  //   price: new FormControl(),
  // });
  //
  // obj: any;
  //
  // listCategory:Category[] = [];
  //
  //
  // id: any;
  // constructor(private houseService: HouseService,
  //             private activatedRoute: ActivatedRoute,
  //             private categoryService: CategoryService,) {
  //   this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
  //     // @ts-ignore
  //     this.id = +paramMap.get('id');
  //
  //     const product = this.getHouse(this.id);
  //     // @ts-ignore
  //     this.productForm.setValue(product);
  //   });
  // }
  //
  // ngOnInit(): void {
  //
  //   this.categoryService.findAll().subscribe((data)=>{
  //     console.log(data)
  //     this.listCategory = data;
  //   })
  // }
  //
  // getHouse(id: number) {
  //   return this.houseService.findById(id).subscribe(data =>{
  //     this.houseForm = new FormGroup({
  //       name: new FormControl(data.name),
  //       price: new FormControl(data.price),
  //       categoryId: new FormControl(data.category.id),
  //       address: new FormControl(data.address),
  //       bedroom: new FormControl(data.bedroom),
  //       bathroom: new FormControl(data.bathroom),
  //       description: new FormControl(data.description),
  //     })
  //   });
  // }

}
