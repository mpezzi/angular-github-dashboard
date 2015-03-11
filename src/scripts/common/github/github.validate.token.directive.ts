module app.common.github {

  'use strict';

  /* @ngInject */
  export function GithubTokenValidateDirective (
    GithubService:app.common.github.GithubService
  ) {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };


    function link (scope, elem, attr, ctrl) {

      ctrl.$parsers.push(function (value) {

        GithubService.checkToken(value)
          .then((res) => {
            ctrl.$setValidity('validGithubToken', true);
          })
          .catch((err) => {
            ctrl.$setValidity('validGithubToken', false);
          });

        return value;

      });

    }

  }

  app.addDirective('app.common.github', 'requireValidGithubToken', GithubTokenValidateDirective);

}
