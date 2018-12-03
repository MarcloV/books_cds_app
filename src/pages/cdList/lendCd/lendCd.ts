import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Cd } from '../../../models/cd';
import { CdService } from '../../../services/cdService';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'page-lendCd',
    templateUrl: 'lendCd.html'
  })
  export class LendCdPage implements OnInit{ 
    index: number;
    cd: Cd;

    constructor(public navParams: NavParams, public viewCtrl: ViewController,private cdService: CdService) {
    }
  
    ngOnInit() {
      this.index= this.navParams.get('index');
      this.cd =this.cdService.cdsList[this.index];
    }
    dismissModal() {
      this.viewCtrl.dismiss();
    }
    onToggleCd() {
      this.cd.isLend = !this.cd.isLend;
    }
    onSubmitForm(form: NgForm) {
      console.log(form.value);
      this.dismissModal();
  }
  
  onDeleteName() {
      this.cd.userName = '';
      this.dismissModal();
  }
  }