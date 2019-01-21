import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SetCoordinatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-coordinates',
  templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage {

  latitude: number = 51.678418;
  longitude: number = 7.809007;
  marker: {
    latitude: number,
    longitude: number,
    draggable: true
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  /**
   * display pop
   */
  ionViewDidLoad() {
    this.marker = {
      latitude: this.latitude,
      longitude: this.longitude,
      draggable: true
    };
    console.log('>>> ionViewDidLoad SetCoordinatesPage', this.latitude, this.longitude,
      this.marker);
  }

  ngOnInit() {
    console.log('>> set coordinate - ngOnInit');
    if (this.navParams.get('latitude')) {
      this.latitude = this.navParams.get('latitude');
      this.longitude = this.navParams.get('longitude');
    }
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onMapClicked($event) {
    console.log('>>> onMapClicked');
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  onSave() {
    this.viewCtrl.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }
  
  onLocateMe() {
    let loader = this.loadingCtrl.create({
      content: 'Recherche de votre position…'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
          draggable: true
        }
      }).catch(
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

}
