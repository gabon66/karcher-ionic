import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalGooglePlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-google-places',
  templateUrl: 'modal-google-places.html',
})
export class ModalGooglePlacesPage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    //debugger
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions){
          predictions.forEach(function (prediction) {
            console.log(prediction);
            me.autocompleteItems.push(prediction.description);
          });
        }
      });
    });
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
