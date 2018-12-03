import{Book} from '../models/book'
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import {DataSnapshot} from 'firebase/storage'

export class BookService {
  books$ = new Subject<Book[]>();

    booksList: Book[] = [
        {
          name: 'First book',
          description:  [
            'Author : me'
          ],
          isLend: false,
          userName:'',
        }
        
      ];
      addBook(book: Book) {
        this.booksList.push(book);
        this.emitBooks();
      }
      emitBooks() {
        this.books$.next(this.booksList.slice());
      }
      saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('books').set(this.booksList).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    
      retrieveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('books').once('value').then(
            (data: DataSnapshot) => {
              this.booksList = data.val();
              this.emitBooks();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
      }
}
