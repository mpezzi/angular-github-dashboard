module app.repo {

  'use strict';

  export class RepoConfigController {

    rows : number;

    config: any;

    /* @ngInject */
    constructor (
      private $state:any,
      private $timeout:ng.ITimeoutService,
      private StorageService:app.common.storage.StorageService
    ) {

      this.config = {
        token: this.StorageService.getItem('githubToken'),
        repos: this.StorageService.getItem('githubRepos')
      };

      if (this.config.repos) {
        this.rows = this.config.repos.length;
      }
      else {
        this.rows = 1;
      }

    }

    getRows (num) {

      return new Array(num);

    }

    addRow () {

      this.rows++;

    }

    removeRow () {

      if (this.rows < 1) {
        return;
      }

      this.rows--;

      delete this.config.repos[this.rows];

    }

    showError (form, field) {

      return (form[field].$dirty && form[field].$invalid) || form.$submitted;

    }

    submit (data) {

      var repos = [];

      this.StorageService.setItem('githubToken', data.token);

      angular.forEach(data.repos, (repo) => {
        repos.push({ owner: repo.owner, name: repo.name });
      });

      this.StorageService.setItem('githubRepos', repos);

      this.$timeout(() => {
        this.$state.go('repo');
      }, 500);

    }

    cancel () {

      this.$state.go('repo');

    }

  }

  app.addController('app.repo', 'RepoConfigController', RepoConfigController);

}
