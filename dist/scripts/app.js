

var app;
(function (app) {
    'use strict';
    function addModule(moduleName, deps) {
        angular.module(moduleName, deps);
    }
    app.addModule = addModule;
    function addController(moduleName, controllerName, controllerFn) {
        angular.module(moduleName).controller(controllerName, controllerFn);
    }
    app.addController = addController;
    function addProvider(moduleName, providerName, providerFn) {
        angular.module(moduleName).provider(providerName, providerFn);
    }
    app.addProvider = addProvider;
    function addService(moduleName, serviceName, serviceFn) {
        angular.module(moduleName).service(serviceName, serviceFn);
    }
    app.addService = addService;
    function addFactory(moduleName, factoryName, factoryFn) {
        angular.module(moduleName).factory(factoryName, factoryFn);
    }
    app.addFactory = addFactory;
    function addConfig(moduleName, configFn) {
        angular.module(moduleName).config(configFn);
    }
    app.addConfig = addConfig;
    function addDirective(moduleName, directiveName, directiveFn) {
        angular.module(moduleName).directive(directiveName, directiveFn);
    }
    app.addDirective = addDirective;
    angular.module('app', [
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'app.repo'
    ]);
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (repo) {
        'use strict';
        app.addModule('app.repo', [
            'app.common.storage',
            'app.common.github',
            'ui.router'
        ]);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var common;
    (function (common) {
        var github;
        (function (github) {
            'use strict';
            app.addModule('app.common.github', []);
        })(github = common.github || (common.github = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

var app;
(function (app) {
    var common;
    (function (common) {
        var storage;
        (function (storage) {
            'use strict';
            app.addModule('app.common.storage', []);
        })(storage = common.storage || (common.storage = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (_repo) {
        'use strict';
        var RepoConfigController = (function () {
            function RepoConfigController($state, StorageService) {
                this.$state = $state;
                this.StorageService = StorageService;
                this.config = {
                    token: this.StorageService.getItem('githubToken'),
                    repos: this.StorageService.getItem('githubRepos')
                };
                this.rows = this.config.repos.length;
            }
            RepoConfigController.prototype.getRows = function (num) {
                return new Array(num);
            };
            RepoConfigController.prototype.addRow = function () {
                this.rows++;
            };
            RepoConfigController.prototype.removeRow = function () {
                if (this.rows < 1) {
                    return;
                }
                this.rows--;
                delete this.config.repos[this.rows];
            };
            RepoConfigController.prototype.showError = function (form, field) {
                return (form[field].$dirty && form[field].$invalid) || form.$submitted;
            };
            RepoConfigController.prototype.submit = function (data) {
                var repos = [];
                this.StorageService.setItem('githubToken', data.token);
                angular.forEach(data.repos, function (repo) {
                    repos.push({ owner: repo.owner, name: repo.name });
                });
                this.StorageService.setItem('githubRepos', repos);
                this.$state.go('repo');
            };
            RepoConfigController.prototype.cancel = function () {
                this.$state.go('repo');
            };
            return RepoConfigController;
        })();
        _repo.RepoConfigController = RepoConfigController;
        app.addController('app.repo', 'RepoConfigController', RepoConfigController);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (_repo) {
        'use strict';
        var RepoController = (function () {
            function RepoController(GithubService, StorageService) {
                this.GithubService = GithubService;
                this.StorageService = StorageService;
                this.repos = {};
                this.reposToList = [];
                this.reposToList = StorageService.getItem('githubRepos') || [];
                this.loadRepos();
            }
            RepoController.prototype.loadRepos = function () {
                var _this = this;
                this.reposToList.forEach(function (repoToList) {
                    _this.GithubService.getRepo(repoToList.owner, repoToList.name).then(function (repo) {
                        _this.repos[repoToList.name] = repo;
                    });
                });
            };
            return RepoController;
        })();
        _repo.RepoController = RepoController;
        app.addController('app.repo', 'RepoController', RepoController);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (repo) {
        'use strict';
        var RepoDirectiveController = (function () {
            function RepoDirectiveController($scope, GithubService) {
                this.$scope = $scope;
                this.GithubService = GithubService;
                this.repo = $scope.repo;
                this.loadRepoForks();
                this.loadRepoIssues();
            }
            RepoDirectiveController.prototype.loadRepoForks = function () {
                var _this = this;
                this.GithubService.getRepoForks(this.repo.owner.login, this.repo.name).then(function (forks) {
                    _this.repo.forks = forks;
                });
            };
            RepoDirectiveController.prototype.loadRepoIssues = function () {
                var _this = this;
                this.GithubService.getRepoIssues(this.repo.owner.login, this.repo.name).then(function (issues) {
                    _this.repo.issues = issues.filter(function (issue) {
                        return (typeof issue.pull_request == 'undefined');
                    });
                    _this.repo.prs = issues.filter(function (issue) {
                        return (typeof issue.pull_request != 'undefined');
                    });
                });
            };
            return RepoDirectiveController;
        })();
        repo.RepoDirectiveController = RepoDirectiveController;
        app.addController('app.repo', 'RepoDirectiveController', RepoDirectiveController);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (repo) {
        function RepoOverviewDirective() {
            return {
                restrict: 'EA',
                scope: {
                    repo: '='
                },
                controller: 'RepoDirectiveController as vm',
                templateUrl: '/src/scripts/repo/repo.directive.html'
            };
        }
        repo.RepoOverviewDirective = RepoOverviewDirective;
        app.addDirective('app.repo', 'repoOverview', RepoOverviewDirective);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (repo) {
        'use strict';
        function RepoRoute($stateProvider, $urlRouterProvider) {
            $stateProvider.state('repo', {
                url: '/repos',
                controller: 'RepoController as vm',
                templateUrl: '/src/scripts/repo/repo.html'
            }).state('repo.view', {
                url: '/:repoOwner/:repoName',
                views: {
                    '@': {
                        controller: 'RepoViewController as vm',
                        templateUrl: '/src/scripts/repo/repo.view.html',
                        resolve: {
                            repo: ['$stateParams', 'GithubService', function ($stateParams, GithubService) {
                                return GithubService.getRepo($stateParams.repoOwner, $stateParams.repoName);
                            }]
                        }
                    }
                }
            }).state('repo.config', {
                url: '/config',
                views: {
                    '@': {
                        controller: 'RepoConfigController as vm',
                        templateUrl: '/src/scripts/repo/repo.config.html'
                    }
                }
            });
            $urlRouterProvider.otherwise('/repos');
        }
        app.addConfig('app.repo', RepoRoute);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (repo) {
        'use strict';
        var RepoService = (function () {
            function RepoService() {
            }
            return RepoService;
        })();
        repo.RepoService = RepoService;
        app.addService('app.repo', 'RepoService', RepoService);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var repo;
    (function (_repo) {
        'use strict';
        var RepoViewController = (function () {
            function RepoViewController(repo) {
                this.repo = repo;
            }
            return RepoViewController;
        })();
        _repo.RepoViewController = RepoViewController;
        app.addController('app.repo', 'RepoViewController', RepoViewController);
    })(repo = app.repo || (app.repo = {}));
})(app || (app = {}));

var app;
(function (app) {
    var common;
    (function (common) {
        var github;
        (function (github) {
            'use strict';
            var GithubService = (function () {
                function GithubService($http, $log, StorageService) {
                    this.$http = $http;
                    this.$log = $log;
                    this.StorageService = StorageService;
                    this.basePath = 'https://api.github.com';
                    this.token = this.StorageService.getItem('githubToken');
                }
                GithubService.prototype.checkToken = function (token) {
                    return this.request('GET', '/user', { headers: { 'Authorization': 'token ' + token } }).then(function (res) {
                        return res.data;
                    });
                };
                GithubService.prototype.getRepo = function (owner, repo) {
                    return this.request('GET', '/repos/' + owner + '/' + repo).then(function (res) {
                        return res.data;
                    });
                };
                GithubService.prototype.getRepoIssues = function (owner, repo, params) {
                    if (params === void 0) { params = {}; }
                    return this.request('GET', '/repos/' + owner + '/' + repo + '/issues', { params: params }).then(function (res) {
                        return res.data;
                    });
                };
                GithubService.prototype.getRepoForks = function (owner, repo, params) {
                    if (params === void 0) { params = {}; }
                    return this.request('GET', '/repos/' + owner + '/' + repo + '/forks', { params: params }).then(function (res) {
                        return res.data;
                    });
                };
                GithubService.prototype.request = function (method, endpoint, requestConfig) {
                    if (requestConfig === void 0) { requestConfig = {}; }
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
                };
                return GithubService;
            })();
            github.GithubService = GithubService;
            app.addService('app.common.github', 'GithubService', GithubService);
        })(github = common.github || (common.github = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

var app;
(function (app) {
    var common;
    (function (common) {
        var github;
        (function (github) {
            'use strict';
            function GithubTokenValidateDirective(GithubService) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: link
                };
                function link(scope, elem, attr, ctrl) {
                    ctrl.$parsers.push(function (value) {
                        GithubService.checkToken(value).then(function (res) {
                            ctrl.$setValidity('validGithubToken', true);
                        }).catch(function (err) {
                            ctrl.$setValidity('validGithubToken', false);
                        });
                        return value;
                    });
                }
            }
            github.GithubTokenValidateDirective = GithubTokenValidateDirective;
            app.addDirective('app.common.github', 'requireValidGithubToken', GithubTokenValidateDirective);
        })(github = common.github || (common.github = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

var app;
(function (app) {
    var common;
    (function (common) {
        var storage;
        (function (storage) {
            'use strict';
            var StorageService = (function () {
                function StorageService() {
                }
                StorageService.prototype.setItem = function (key, value) {
                    var storedValue = {
                        data: value
                    };
                    localStorage.setItem(key, JSON.stringify(storedValue));
                };
                StorageService.prototype.getItem = function (key) {
                    var storedValue = JSON.parse(localStorage.getItem(key));
                    if (storedValue && storedValue.data) {
                        return storedValue.data;
                    }
                    return undefined;
                };
                StorageService.prototype.removeItem = function (key) {
                    localStorage.removeItem(key);
                };
                return StorageService;
            })();
            storage.StorageService = StorageService;
            app.addService('app.common.storage', 'StorageService', StorageService);
        })(storage = common.storage || (common.storage = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
