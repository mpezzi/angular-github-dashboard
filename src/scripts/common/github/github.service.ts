module app.common.github {

  'use strict';

  export class GithubService {

    basePath : string;

    token : string;

    /* @ngInject */
    constructor (
      private $http : ng.IHttpService,
      private $log : ng.ILogService,
      private StorageService : app.common.storage.StorageService
    ) {

      this.basePath = 'https://api.github.com';
      this.token    = this.StorageService.getItem('githubToken');

    }

    checkToken (token) {

      return this.request('GET', '/user', { headers: { 'Authorization': 'token ' + token } }).then((res) => {
          return res.data;
        });

    }

    getRepo ( owner:string, repo:string ) {

      return this.request('GET', '/repos/' + owner + '/' + repo).then((res) => {
          return res.data;
        });

    }

    getRepoIssues ( owner:string, repo:string, params:Object = {} ) {

      return this.request('GET', '/repos/' + owner + '/' + repo + '/issues', { params: params }).then((res) => {
          return res.data;
        });

    }

    getRepoForks ( owner:string, repo:string, params:Object = {} ) {

      return this.request('GET', '/repos/' + owner + '/' + repo + '/forks', { params: params }).then((res) => {
          return res.data;
        });

    }

    request ( method:string, endpoint:string, requestConfig:Object = {}) {

      if (!this.token) {
        this.$log.warn('Github Auth Token not set.');
      }

      var config = angular.extend({}, {
        cache: true,
        method: method,
        url: this.basePath + endpoint,
        headers: {
          'Accept': 'application/vnd.github.v3.raw+json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': 'token ' + this.token
        }
      }, requestConfig);

      return this.$http(config);

    }

  }

  app.addService('app.common.github', 'GithubService', GithubService);

}
