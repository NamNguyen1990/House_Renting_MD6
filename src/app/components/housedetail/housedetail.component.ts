import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";


import {HttpClient} from "@angular/common/http";
import {ImageService} from "../../services/image.service";
import {CommentService} from "../../services/comment.service";
import {FormControl, FormGroup} from "@angular/forms";
import {OwlOptions} from "ngx-owl-carousel-o";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-housedetail',
  templateUrl: './housedetail.component.html',
  styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 200,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<<', '>>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  API = 'http://localhost:8888/houses/'
  id: any
  house: any;
  obj: any = {};
avatar : any;
  id_house: any

  commentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    rate: new FormControl()
  })


  constructor(private houseService: HouseService,
              private activatedRouter: ActivatedRoute,
              private httClient: HttpClient,
              private router: Router,
              private imageService: ImageService,
              private commentService: CommentService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.httClient.get(this.API + param.get('id')).subscribe((data) => {
        this.house = data
        this.showImages(this.house.id);
        this.showComment(this.house.id);
      })
      this.id_house = param.get('id')
      console.log(param);
      this.houseService.findById(this.id_house).subscribe((data) => {
        console.log(data);
        this.obj = data;
      });
    })
    this.avatar = localStorage.getItem('AVATAR');
  }

  add() {
    console.log(this.commentForm.value)
    this.obj = {
      house: {
        id: this.id_house
      },
      user: {
        id: localStorage.getItem('ID')
      },
      description: this.commentForm.value.description,
      rate: this.commentForm.value.rate
    }
    this.commentService.save(this.obj).subscribe((data) => {
      this.showComment(this.house.id);
      this.commentForm.reset()
    }, error => {
      this.toast.error({detail: "Notification", summary: "You haven't rented a house yet. so don't comment", duration :3000})
      console.log(error)
    })
  }


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



  data: any[] = [];
  submitting = false;
  inputValue = '';
  user = {
    author: this.obj.name,
    avatar: this.obj.avatar,
  };

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);
  }
}

function formatDistance(arg0: Date, arg1: Date) {
  throw new Error('Function not implemented.');
}

