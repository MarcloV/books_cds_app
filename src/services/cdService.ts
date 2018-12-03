import { Cd } from "../models/cd";
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import {DataSnapshot} from 'firebase/firestore'

export class CdService {
  cds$ = new Subject<Cd[]>();

    cdsList: Cd[] = [
        {
          name: 'One cd',
          description:  [
            'one Band'
          ],
          isLend: false,
          userName:'',
        }
      ];

      addCd(cd: Cd) {
        this.cdsList.push(cd);
        this.emitCds();
      }
      emitCds() {
        this.cds$.next(this.cdsList.slice());
      }
      saveData() {
        return new Promise((resolve, reject) => {
          firebase.database().ref('cds').set(this.cdsList).then(
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
          firebase.database().ref('cds').once('value').then(
            (data: DataSnapshot) => {
              this.cdsList = data.val();
              this.emitCds();
              resolve('Données récupérées avec succès !');
            }, (error) => {
              reject(error);
            }
          );
        });
      }
}
