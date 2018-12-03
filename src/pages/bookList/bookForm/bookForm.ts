import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BookService } from '../../../services/bookService';
import { Book } from '../../../models/book';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-bookForm',
  templateUrl: './bookForm.html'
})
export class BookFormPage implements OnInit {

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: this.formBuilder.array([])
    });
  }
  getDescriptionArray() {
    return this.bookForm.get('description') as FormArray;
} 

 onAddDescription (){
   let newControl = this.formBuilder.control('');
   this.getDescriptionArray().controls.push(newControl);
 }

onRemoveDescription(index: number) {
  this.getDescriptionArray().removeAt(index);
}
onSubmitForm() {
  let newBook = new Book(this.bookForm.get('name').value);
  for (let control of this.getDescriptionArray().controls) {
    newBook.description.push(control.value);
  }
  this.bookService.addBook(newBook);
  this.navCtrl.pop();
}

}