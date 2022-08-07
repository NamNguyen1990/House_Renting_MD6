import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap} from "@angular/router";


import {HttpClient} from "@angular/common/http";
import {ImageService} from "../../services/image.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {

  API = 'http://localhost:8888/houses/'
 id:any
  house: any;

  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient,
              private imageService: ImageService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data) => {
        this.house = data
        this.showImages(this.house.id);
        this.showComment(this.house.id);
      })
    })

  }

  // images: any[] = [];
  // getImages(id: number) {
  //   this.imageService.showFullImage(id).subscribe((images) => {
  //     this.images = images;
  //   })
  // }


 images: any[] = []
 showImages(id: any) {
    this.imageService.findByIdHouse(id).subscribe((data) => {
      this.images = data;
    })
 }

 comment: any
 showComment(id: any) {
    this.commentService.findAllByCommentId(id).subscribe((data) => {
      this.comment = data;
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
