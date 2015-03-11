module app.repo {

  /* @ngInject */
  export function RepoOverviewDirective() {

    return {
      restrict: 'EA',
      scope: {
        repo: '='
      },
      controller: 'RepoDirectiveController as vm',
      templateUrl: '/src/scripts/repo/repo.directive.html'
    };

  }

  app.addDirective('app.repo', 'repoOverview', RepoOverviewDirective);

}
