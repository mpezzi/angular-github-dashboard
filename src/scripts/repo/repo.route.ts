module app.repo {

  'use strict';

  // @ngInject
  function RepoRoute ($stateProvider : ng.ui.IStateProvider, $urlRouterProvider) {

    $stateProvider
      .state('repo', {
        url: '/repos',
        controller: 'RepoController as vm',
        templateUrl: '/src/scripts/repo/repo.html'
      })
      .state('repo.view', {
        url: '/:repoOwner/:repoName',
        views: {
          '@': {
            controller: 'RepoViewController as vm',
            templateUrl: '/src/scripts/repo/repo.view.html',
            resolve: {
              repo: ['$stateParams', 'GithubService', function ($stateParams : any, GithubService) {
                return GithubService.getRepo($stateParams.repoOwner, $stateParams.repoName);
              }]
            }
          }
        }
      })
      .state('repo.config', {
        url: '/config',
        views: {
          '@': {
            controller: 'RepoConfigController as vm',
            templateUrl: '/src/scripts/repo/repo.config.html'
          }
        }
      });

    $urlRouterProvider
      .otherwise('/repos');

  }

  app.addConfig('app.repo', RepoRoute);

}
