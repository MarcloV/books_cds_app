import { Component, OnInit, OnDestroy } from '@angular/core';
import { LendBookPage } from './lendBook/lendBook';
import { ModalController, MenuController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Book } from '../../models/Book';
import { BookService} from '../../services/bookService'
import { BookFormPage } from './bookForm/bookForm';
import { Subscription } from 'rxjs/Subscription'




@Component({
  selector: 'page-bookList',
  templateUrl: 'bookList.html'
})
export class BookListPage implements OnInit, OnDestroy {
  booksList: Book [];
  booksSubscription: Subscription;

constructor( private modalCtrl: ModalController, 
            private bookService: BookService, 
            private menuCtrl: MenuController,
            private navCtrl: NavController,
            private toastCtrl: ToastController,
            private loadingCtrl: LoadingController){}

ngOnInit() {
  this.booksSubscription = this.bookService.books$.subscribe(
    (books: Book[]) => {
      this.booksList = books.slice();
      
    }
  );
this.onFetchList();
  this.bookService.emitBooks();

}
onLoadbook(index:number) {
  let modal = this.modalCtrl.create(LendBookPage, {index: index});
  modal.present();
}
onToggleMenu() {
  this.menuCtrl.open();
}
onNewBook() {
  this.navCtrl.push(BookFormPage);
}
onSaveList() {
  let loader = this.loadingCtrl.create({
    content: 'Sauvegarde en cours…'
  });
  loader.present();
  this.bookService.saveData().then(
    () => {
      loader.dismiss();
      this.toastCtrl.create({
        message: 'Données sauvegardées !',
        duration: 3000,
        position: 'bottom'
      }).present();
    },
    (error) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  );
}
onFetchList() {
  let loader = this.loadingCtrl.create({
    content: 'Récuperation en cours…'
  });
  loader.present();
  this.bookService.retrieveData().then(
    () => {
      loader.dismiss();
      this.toastCtrl.create({
        message: 'Données récupérées !',
        duration: 3000,
        position: 'bottom'
      }).present();
    },
    (error) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  );
}
ngOnDestroy() {
  this.booksSubscription.unsubscribe();
}

}






























































































