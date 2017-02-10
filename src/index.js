import angular from 'angular';
import appModule from 'config';
import '../public/css/master.scss';
// import 'todos/modernizr.js';
// import 'todos/headline-main.js';
angular.bootstrap(document, [appModule.name]);