module app.repo {

  'use strict';

  export class RepoDirectiveController {

    repo : any;

    /* @ngInject */
    constructor (
      private $scope,
      private GithubService : app.common.github.GithubService
    ) {

      this.repo = $scope.repo;

      this.loadRepoForks();
      this.loadRepoIssues();

    }

    loadRepoForks () {

      this.GithubService.getRepoForks(this.repo.owner.login, this.repo.name).then((forks : Array<any>) => {
        this.repo.forks = forks;
      });

    }

    loadRepoIssues () {

      this.GithubService.getRepoIssues(this.repo.owner.login, this.repo.name).then((issues : Array<any>) => {
        this.repo.issues = issues.filter((issue) => {
          return (typeof issue.pull_request == 'undefined');
        });

        this.repo.prs = issues.filter((issue) => {
          return (typeof issue.pull_request != 'undefined');
        });
      });

    }

  }

  app.addController('app.repo', 'RepoDirectiveController', RepoDirectiveController);

}
