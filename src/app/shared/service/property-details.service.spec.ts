import { TestBed } from '@angular/core/testing';
import { PropertyDetailsService } from './property-details.service';
import { postedProperties } from '../model/postedProperties';

describe('PropertyDetailsService', () => {
  let service: PropertyDetailsService;

  beforeEach(() => {
    const mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
        return key === 'property' ? JSON.stringify(postedProperties) : null;
      }),
      setItem: jasmine.createSpy('setItem'),
      removeItem: jasmine.createSpy('removeItem'),
    };

    TestBed.configureTestingModule({
      providers: [
        PropertyDetailsService,
        { provide: Window, useValue: { localStorage: mockLocalStorage } },
      ],
    });

    service = TestBed.inject(PropertyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPropertyList', () => {
    it('should return property list from localStorage when available', () => {
      const properties = service.getAllPropertyList();
      expect(properties).toEqual(postedProperties);
    });

    it('should return null if no properties are found in localStorage', () => {
      const mockLocalStorage = TestBed.inject(Window).localStorage;
      mockLocalStorage.getItem.and.returnValue(null);

      const properties = service.getAllPropertyList();
      expect(properties).toBeNull();
    });
  });

  describe('registerExistingProperties', () => {
    it('should store the properties list in localStorage', () => {
      service.registerExistingProperties();

      const mockLocalStorage = TestBed.inject(Window).localStorage;
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('property', JSON.stringify(postedProperties));
    });
  });

  describe('registerProperties', () => {
    it('should add a property to the list and store it in localStorage', () => {
      const newProperty = {
        id: 3,
        title: 'New Property',
        address: 'New Address',
        description: 'New description',
        price: 1000000
      };

      service.registerProperties(newProperty);

      const properties = service.getAllPropertyList();
      expect(properties).toContain(newProperty);

      const mockLocalStorage = TestBed.inject(Window).localStorage;
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('property', JSON.stringify([...postedProperties, newProperty]));
    });
  });

  describe('getNewPropertyId', () => {
    it('should return the next property ID based on the existing properties list', () => {
      const newId = service.getNewPropertyId();
      const lastProperty = postedProperties[postedProperties.length - 1];
      expect(newId).toBe(lastProperty.id + 1);
    });

    it('should return NaN if there are no properties', () => {
      const mockLocalStorage = TestBed.inject(Window).localStorage;
      mockLocalStorage.getItem.and.returnValue(null);

      const newId = service.getNewPropertyId();
      expect(newId).toBeNaN();
    });
  });
});
