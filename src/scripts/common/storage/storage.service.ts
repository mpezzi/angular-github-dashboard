module app.common.storage {

  'use strict';

  export class StorageService {

    constructor () {

    }

    setItem ( key:string, value:any ) {

      var storedValue = {
        data: value
      };

      localStorage.setItem(key, JSON.stringify(storedValue));

    }

    getItem ( key:string ) {

      var storedValue = JSON.parse(localStorage.getItem(key));

      if (storedValue && storedValue.data) {
        return storedValue.data;
      }

      return undefined;

    }

    removeItem ( key:string ) {

      localStorage.removeItem(key);

    }

  }

  app.addService('app.common.storage', 'StorageService', StorageService);

}
