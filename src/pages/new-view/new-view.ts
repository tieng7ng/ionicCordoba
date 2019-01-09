import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from 'ionic-angular';


import { SetCoordinatesPage } from '../set-coordinates/set-coordinates';

@IonicPage()
@Component({
  selector: 'page-new-view',
  templateUrl: 'new-view.html',
})

export class NewViewPage {

  natureViewForm: FormGroup;
  latitude: number;
  longitude: number;
  imageUrl: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewViewPage');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.natureViewForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      description: [''],
    });
  }

  onOpenCoordsModal() {
    let modal = this.modalCtrl.create(SetCoordinatesPage);
    modal.present();
  }

}
