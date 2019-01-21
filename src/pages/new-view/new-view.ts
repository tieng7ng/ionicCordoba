import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { NatureView } from '../../models/NatureView.model';
import { NatureViewService } from '../../services/natureView.service';

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
    private modalCtrl: ModalController,
    private camera: Camera,
    private toastCtrl: ToastController,
    private natureViewService: NatureViewService,
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

  /**
   * 
   */
  onOpenCoordsModal() {
    let modal;

    if (this.latitude) {
      //=====
      // Coordonne isset
      console.log('>> coordonee isset',
        this.latitude,
        this.longitude
      );
      modal = this.modalCtrl.create(
        SetCoordinatesPage,
        {
          latitude: this.latitude, longitude: this.longitude
        });
      // Coordonne isset
      //=====

    } else {
      console.log('>> coordonee emtpy');
      modal = this.modalCtrl.create(
        SetCoordinatesPage
      );
    }

    modal.present();
    // Listen when close modal
    modal.onDidDismiss(
      (data) => {
        if (data) {
          this.latitude = data.latitude;
          this.longitude = data.longitude;
        }
      }
    );
  } // onOpenCoordsModal()

  onTakePhoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          this.imageUrl = normalizeURL(data);
        }
      }
    ).catch(
      (error) => {
        this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    )
  }

  onSubmitForm() {
    let newView = new NatureView(
      this.natureViewForm.get('name').value,
      new Date(),
      this.natureViewForm.get('description').value,
      this.latitude,
      this.longitude,
      this.imageUrl
    );
    this.natureViewService.addNatureView(newView);
    this.navCtrl.pop();
  }
}
