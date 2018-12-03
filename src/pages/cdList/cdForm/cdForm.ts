import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CdService } from '../../../services/cdService';
import { Cd } from '../../../models/cd';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cdForm',
  templateUrl: './cdForm.html'
})
export class CdFormPage implements OnInit {

  cdForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private cdService: CdService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.cdForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: this.formBuilder.array([])
    });
  }
  getDescriptionArray() {
    return this.cdForm.get('description') as FormArray;
} 

 onAddDescription (){
   let newControl = this.formBuilder.control('');
   this.getDescriptionArray().controls.push(newControl);
 }

onRemoveDescription(index: number) {
  this.getDescriptionArray().removeAt(index);
}
onSubmitForm() {
  let newCd = new Cd(this.cdForm.get('name').value);
  for (let control of this.getDescriptionArray().controls) {
    newCd.description.push(control.value);
  }
  this.cdService.addCd(newCd);
  this.navCtrl.pop();
}

}