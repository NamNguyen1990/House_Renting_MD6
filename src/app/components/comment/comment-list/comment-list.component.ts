import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input()
  comment: any;

  constructor( private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.findAll().subscribe((data) => {
      console.log(data)
      // @ts-ignore
      this.comment = data;
      console.log(this.comment)
    })
  }

}


