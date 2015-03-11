module app.repo {

  'use strict';

  export class RepoController {

    repos : any = {};

    reposToList : any = [];

    /* @ngInject */
    constructor (
        private GithubService : app.common.github.GithubService,
        private StorageService : app.common.storage.StorageService
      ) {

      this.reposToList = StorageService.getItem('githubRepos') || [];

      this.loadRepos();

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
