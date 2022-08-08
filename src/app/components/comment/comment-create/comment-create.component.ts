import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommentService} from "../../../services/comment.service";
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  @Input()
  commentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
  })

  obj: any
  id_house: any

  constructor( private httpClient: HttpClient,
               private commentService: CommentService,
               private houseService: HouseService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id_house = param.get('id')
      console.log(param);
      this.houseService.findById(this.id_house).subscribe((data) => {
        console.log(data);
        this.obj = data;
      });
    })
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
      description: this.commentForm.value.description
    }
    this.commentService.save(this.obj).subscribe((data) => {
      this.router.navigate(['/view', this.id_house])
    },error => {
     console.log(error)
    })
  }
}
