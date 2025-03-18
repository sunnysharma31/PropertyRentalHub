import { Injectable } from '@angular/core';
import { postedProperties } from '../model/postedProperties';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {
  private propertyKey: string = 'property';
  constructor() { }
  
  propertyList = postedProperties;
  private filteredProperties = new BehaviorSubject(this.propertyList);

  getAllPropertyList(){
    const allUsers = localStorage.getItem(this.propertyKey);
    if(allUsers){
      return JSON.parse(allUsers); 
    }
    return null;
  } 

  searchProperties(query: any) {
    let filtered = this.propertyList;

    // Filter by buildingName, streetAddress, and other attributes
    if (query.buildingName) {
      filtered = filtered.filter(property => 
        property.buildingName.toLowerCase().includes(query.buildingName.toLowerCase()));
    }

    if (query.streetAddress) {
      filtered = filtered.filter(property => 
        property.streetAddress.toLowerCase().includes(query.streetAddress.toLowerCase()));
    }

    if (query.squareFeet) {
      filtered = filtered.filter(property => 
        property.squareFeet === query.squareFeet);
    }

    if (query.sharedProperty) {
      filtered = filtered.filter(property => 
        property.sharedProperty.toLowerCase() === query.sharedProperty.toLowerCase());
    }

    if (query.leaseType) {
      filtered = filtered.filter(property => 
        property.leaseType.toLowerCase() === query.leaseType.toLowerCase());
    }

    if (query.furnishedStatus) {
      filtered = filtered.filter(property => 
        property.furnishedStatus.toLowerCase() === query.furnishedStatus.toLowerCase());
    }

    if (query.amenities) {
      filtered = filtered.filter(property => 
        property.amenities.some(amenity => query.amenities.includes(amenity)));
    }

    this.filteredProperties.next(filtered);
  }

  getFilteredProperties() {
    return this.filteredProperties.asObservable();
  }

  registerExistingProperties():void{
    localStorage.setItem(this.propertyKey,JSON.stringify(this.propertyList));
  }

  registerProperties(property:any):void{
    this.propertyList.push(property);
    localStorage.setItem(this.propertyKey,JSON.stringify(this.propertyList));
  }

  getNewPropertyId(){
    return this.getAllPropertyList()[this.getAllPropertyList()?.length - 1].id + 1;
  }

}
