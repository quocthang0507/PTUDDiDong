import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})

export class MapPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	latitude: number = 21.028511;
	longitude: number = 105.804817; //Hanoi - Default location

	constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public platform: Platform) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MapPage');
		this.platform.ready().then(() => {
			//Ionic fails to get Android's location so I will load default map 
			this.loadMap(this.latitude, this.longitude);
			//If Ionic gets Android's Location successfully, it will be shown your map
			this.getCurrentPosition();
		})
	}

	getCurrentPosition() {
		console.log('Map: Getting current location...');
		this.geolocation.getCurrentPosition().then(result => {
			this.latitude = result.coords.latitude;
			this.longitude = result.coords.longitude;
			console.log('Map: Your position ' + this.latitude + ', ' + this.longitude);
			this.loadMap(this.latitude, this.longitude);
		}).catch(error => {
			console.log('Map: Error ' + error);
		});
	}

	loadMap(latitude, longitude) {
		console.log('Map: Showing map...');
		let options = {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP

		}
		this.map = new google.maps.Map(this.mapElement.nativeElement, options);
	}

	addInfoWindow(marker, content) {
		let infoWindow = new google.maps.InfoWindow({
			content: content
		});
		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});
	}

	addMarker() {
		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: this.map.getCenter()
		});
		let content = "<h5>Vị trí của bạn</h5><p>" + this.latitude + ", " + this.longitude + "</p>";
		this.addInfoWindow(marker, content);
	}
}