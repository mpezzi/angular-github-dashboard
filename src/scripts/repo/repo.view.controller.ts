module app.repo {

  'use strict';

  export class RepoViewController {

    /* @ngInject */
    constructor (
      private repo : any
    ) {

    }

  }

  app.addController('app.repo', 'RepoViewController', RepoViewController);

}
