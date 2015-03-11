/// <reference path='_all.ts' />

module app {

  'use strict';

  export function addModule ( moduleName:string, deps:Array<string> ) {

    angular.module(moduleName, deps);

  }

  export function addController ( moduleName:string, controllerName:string, controllerFn:any ) {

    angular.module(moduleName).controller(controllerName, controllerFn);

  }

  export function addProvider ( moduleName:string, providerName:string, providerFn:any ) {

    angular.module(moduleName).provider(providerName, providerFn);

  }

  export function addService ( moduleName:string, serviceName:string, serviceFn:any ) {

    angular.module(moduleName).service(serviceName, serviceFn);

  }

  export function addFactory ( moduleName:string, factoryName:string, factoryFn:any ) {

    angular.module(moduleName).factory(factoryName, factoryFn);

  }

  export function addConfig ( moduleName:string, configFn:Function ) {

    angular.module(moduleName).config(configFn);

  }

  export function addDirective ( moduleName:string, directiveName:string, directiveFn:any ) {

    angular.module(moduleName).directive(directiveName, directiveFn);

  }

  angular.module('app', [

    'ngAria',
    'ngMessages',
    'ngMaterial',

    'app.repo',
    'app.templates'

  ]);

}
