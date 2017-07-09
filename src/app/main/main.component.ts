import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
declare const DG;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  markerStorage: any = [];
  markerOnMap: any = [];
  map: any;
  error = '';
  mapLatitude: number;
  mapLongitude: number;
  constructor( private dataService: DataService) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLatitude = position.coords.latitude;
        this.mapLongitude = position.coords.longitude;
        DG.then(() => {
          this.map = DG.map('map', {
            center: [this.mapLatitude, this.mapLongitude],
            zoom: 15,
            // geoclicker: true
          });
          this.map.setLang('en');
          this.map.on('click', (e) => {
            const marker = DG.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
            console.log(marker);
            this.error = '';
            this.markerOnMap.push(marker);
            this.markerStorage.push([e.latlng.lat, e.latlng.lng]);
          });
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }

  saveMarkers() {
    const tempMarkerArray: any = {};
    tempMarkerArray.list = this.markerStorage;
    this.dataService.sendMarkers(tempMarkerArray);
    console.log(tempMarkerArray);
  }

  showMarkers() {
    this.dataService.getMarkers().subscribe(
      data => {
          if ( typeof data[0] != 'undefined') {
            const tempArray = data[0].list;
            for (let i = 0; i < tempArray.length; i++) {
              const marker = DG.marker([tempArray[i][0], tempArray[i][1]]).addTo(this.map);
              this.markerOnMap.push(marker);
            }
          }else {
            this.error = 'list of saved markers is empty';
          }
      },
      err => console.log(err)
    );
  }

  // remove marker from map without cleaning backend
  removeMarkersFromMap() {
    if (this.markerOnMap.length != 0) {
      console.log(this.markerOnMap);
      for (let i = 0; i < this.markerOnMap.length; i++) {
        this.markerOnMap[i].remove();
      }
    }
  }

  // totla removing of markers
  deleteMarkers() {
    this.removeMarkersFromMap();
    this.dataService.removeMarkers().subscribe(
      data => {
        if (typeof data == 'undefined') {
          this.error = 'list of saved markers on server is empty';
        }else {
          console.log(data);
        }
      },
      err => console.log(err)
    );
  }

  getListOfObject(chosenList) {
    this.removeMarkersFromMap();
    let objectsList: any = [];
    let savedMarkers: any = [];
    let ico: any = '';
    switch (chosenList) {
      case 'schools':
        objectsList = this.dataService.getObjectsList(this.mapLatitude, this.mapLongitude).schools;
        ico = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAAwFBMVEX///8CiNECgckCd70Caq8AdLwbicdhmswAh9EAfsgAhdDm8fgCeL5JjsIAZq1JmM2vz+cAcboAY6wAe8cAh8z4/f70+v0Aj9Tb7vjr9/wAZKwAbbEAgc+32u8AfsHV6faFsdOcx+SFweYzf7k9jcbI4fEWc7RaoNC50eZ2uOO+4fNOotsAW6lOqN1Gir/f6fKCrdEAarhqoct3q9GWwOCsx99QnM44ndmh0e2Mu+FhsOBAodq33fE0l9eo1O6WyOn2bwp+AAAENUlEQVRoge3Z63KiMBQAYECwKJRLFbCrEqHFSq26ddta7Grf/602wVoJJBAu7uzMev61o3ye5OQQCMdd4hKXuMT/HNZqYJ1fAVHf8cGZEdvfdTpyd+ffnhGx9hARBJ6H0P5cI2ePNz2IIAZCo934HBlZwbYTIwcGQdtx4xmBsP+FHBme7zrbZmtBSSAnBk5RP1SaQz77PUEgMGjknM9BI8it8YEhGIOgjdFARvu50BFyGAjx831NBHxkkAzDyzK/qVELFviu4VwG1UJ3G1Ss7kHU7xEQEhNXd1SlFmx/Q0YoDMxoU77TvTvE8cph0Bw572WM2/FHj4rQmbi62Tvd4wOhvJgYOEXy4pEJGYSUmWdi4BQ5YXF129v8TAoZBPHb/L6geEWZMDBxRp90yPZ0enmVYVAtzD1KLYyz3asyA2uBn//OGhaYM2XCzMBV1P1INSALhHkLpRKDMhptQQICUZsdKcFAaBedqtvrMdRXJUaWe3qikLF7fYOMoErt5Ow8btkhdkRotXAGbvYeWEuNVemorQwDoX2frdxYCHkUIwQG1cKOZYUyIHCPrUtUhlNYSpsBgS3tKofhuCAqTKhA6Tp+AC+Uz8COsCiYovxMRovDyi9guMImmpcJPz/ePIsZzjLyGmlOKvPT0xUDg7bnbWoDoqay8xI3MyYGQj6t09EmxcfumIwM3EdRGhARccLU3ZKZgZ0uJNUCaebDIP3dEgxnjQm1kE1lQXgKLcPAkXt30ssohYycvU34IgODD/NnGx86DOF37+SvFjPK+mWV/HsQYdWdHK6djz1uDF6+d4IMzPJm+ZocbQtEiZE7zbyMv72xDN3USzDXmjZczrArgMV3LRwz6S4ANvNjXZWkcowoak/X+FV+619TdMjEmWNbfwvoz/DCpRlR/DH8ia0Gy3uLMzrUMP5uKJioZnzV8gyEphOsgRy28jKqYfz/kRsjFRk4dHce9qsVX+h0efwh0/LupcM1KzOidjOcYatPCUOshm9nrnlEqjMwbq5mpGUeB9x3JZBajKhNrzKd8RDBg5tE6jGoFtar7OcG6xRSl4EjN5yknvOUSDVb6ajLQOjuNQEpr+0s0gQjauLSO37E01vp8WqKiaG4FgIK0hCDltE1AG8mBcEY1UWh5t4IaAyqbpc0KV9xuhEExiHGVMYK8hyRjkimXu7tnTfVqAOn0hDJ9YqvjIc9Wf4oxUjmfUTtSTkxmEzJQ0dkTLfSS0gOTdH6hjRyBEYy11VfqaIASzELZRippdc9LDCuM5CaRt6MmgiHmle6unHmWTeaOchRXvBaSDKm+9LgmcevoUZg4EL51eyRFFhPtTQjuevGjwwT1f31+sJ8qFPD1LBnd0/akZGe7+n7kJphvd6hTqfCSbk3znmUa08g1JKqda8ysZpM3ejch8UcOvpe/YWj70tc4hKX+IfjDwP4apjQOA2WAAAAAElFTkSuQmCC';
        break;
      case 'shops':
        objectsList = this.dataService.getObjectsList(this.mapLatitude, this.mapLongitude).shops;
        ico='data:image/png;base64,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';
        break;
      case 'gasStations':
        objectsList = this.dataService.getObjectsList(this.mapLatitude, this.mapLongitude).gasStations;
        ico = 'data:image/jpeg;base64,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';
        break;
    }
    const myIcon = DG.icon({
      iconUrl: ico,
      iconSize: [24, 24]
    });
    this.dataService.getMarkers().subscribe(
      data => {
        if ( typeof data[0] != 'undefined'){
          savedMarkers = data[0].list;
          for ( let i = 0; i < objectsList.length; i++) {
            let min = 100000;
            let currentMin = 0;
            const objMarker = DG.marker([objectsList[i][0], objectsList[i][1]], {icon: myIcon}).addTo(this.map);
            this.markerOnMap.push(objMarker);
            for (let j = 0; j < savedMarkers.length; j++) {
              const latlngObject = DG.latLng(objectsList[i][0], objectsList[i][1]);
              const latlngMarker = DG.latLng(savedMarkers[j][0], savedMarkers[j][1]);
              if ( latlngObject.distanceTo(latlngMarker) < min) { // find minimum distance
                min = latlngObject.distanceTo(latlngMarker);
                currentMin = j;  //  position  of the closest marker
              }
            }
            const marker = DG.marker(savedMarkers[currentMin]).addTo(this.map); // draw closest marker
            this.markerOnMap.push(marker);
          }
        } else {
          this.error = 'please set markers'
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }


}
