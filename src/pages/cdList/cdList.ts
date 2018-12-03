import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { CdService } from '../../services/cdService';
import { Cd } from '../../models/cd';
import { LendCdPage } from './LendCd/LendCd';
import { Subscription } from 'rxjs/Subscription';
import { CdFormPage } from './cdForm/cdForm';

@Component({
  selector: 'page-cdList',
  templateUrl: 'cdList.html'
})
export class CdListPage implements OnInit, OnDestroy {

  cdsList: Cd[];;
  cdsSubscription: Subscription;

  constructor( private modalCtrl: ModalController, 
              private cdService: CdService, 
              private menuCtrl: MenuController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController){}
  
  ngOnInit() {
    this.cdsSubscription = this.cdService.cds$.subscribe(
      (cd: Cd[]) => {
        this.cdsList = cd.slice();
      }
    );
    this.onFetchList();
    this.cdService.emitCds();
  }
  onLoadCd(index:number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }

onNewCd() {
  this.navCtrl.push(CdFormPage);
}
onSaveList() {
  let loader = this.loadingCtrl.create({
    content: 'Sauvegarde en cours…'
  });
  loader.present();
  this.cdService.saveData().then(
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
  this.cdService.retrieveData().then(
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
  this.cdsSubscription.unsubscribe();
}
 }