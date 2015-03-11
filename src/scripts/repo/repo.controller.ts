module app.repo {

  'use strict';

  export class RepoController {

    repos : any = {};

    token : string;

    reposToList : any = [];

    /* @ngInject */
    constructor (
        private $state : ng.ui.IStateService,
        private GithubService : app.common.github.GithubService,
        private StorageService : app.common.storage.StorageService
      ) {

      this.token = StorageService.getItem('githubToken');
      this.reposToList = StorageService.getItem('githubRepos') || [];

      if (this.token && this.reposToList) {
        this.loadRepos();
      }
      else {
        this.$state.go('repo.config');
      }

    }

    loadRepos () {

      this.reposToList.forEach((repoToList) => {

        this.GithubService.getRepo(repoToList.owner, repoToList.name).then((repo) => {
          this.repos[repoToList.name] = repo;
        });

      });

    }

  }

  app.addController('app.repo', 'RepoController', RepoController);

}
