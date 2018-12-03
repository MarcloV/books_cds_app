import { Component } from '@angular/core';

import { BookListPage } from '../BookList/BookList';
import { CdListPage } from '../CdList/CdList';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    bookListPage = BookListPage;
    cdListPage = CdListPage;

    constructor(
      private menuCtrl: MenuController,
    ){}
    
    onToggleMenu() {
      this.menuCtrl.open();
    }
}
