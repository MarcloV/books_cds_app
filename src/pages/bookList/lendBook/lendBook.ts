import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/bookService';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'page-lendBook',
    templateUrl: 'lendBook.html'
  })
  export class LendBookPage implements OnInit{ 
    index: number;
    book: Book;

    constructor(public navParams: NavParams, public viewCtrl: ViewController,private bookService: BookService) {
    }
  
    ngOnInit() {
      this.index= this.navParams.get('index');
      this.book =this.bookService.booksList[this.index];
    }
    dismissModal() {
      this.viewCtrl.dismiss();
    }
    onToggleBook() {
      this.book.isLend = !this.book.isLend;
    }
    onSubmitForm(form: NgForm) {
      console.log(form.value);
      this.dismissModal();
  }
  
  onDeleteName() {
      this.book.userName = '';
      this.dismissModal();
  }
  }