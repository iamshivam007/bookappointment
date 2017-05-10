
angular.module('app')
  /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      moment:         [   'static/bower_components/moment/moment.js'],
      screenfull:     [   'static/bower_components/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   'static/bower_components/slimscroll/jquery.slimscroll.min.js'],
      dataTable:      [   'static/bower_components/datatables/media/js/jquery.dataTables.min.js',
        'static/bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
        'static/bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.css']
    }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
      debug:  true,
      events: true,
      modules: [
        {
          name: 'ui.select',
          files: [
            'static/bower_components/angular-ui-select/dist/select.min.js',
            'static/bower_components/angular-ui-select/dist/select.min.css'
          ]
        },
        {
          name: 'angularBootstrapNavTree',
          files: [
            'static/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
            'static/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
        },
        {
          name: 'toaster',
          files: [
            'static/bower_components/angularjs-toaster/toaster.js',
            'static/bower_components/angularjs-toaster/toaster.css'
          ]
        },
        {
          name: 'smart-table',
          files: [
            'static/vendors/angular-smart-table/js/smart-table.min.js'
          ]
        },
        {
          name: 'textAngular',
          files: [
            'https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.2.2/textAngular-sanitize.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.2.2/textAngular.min.js'
          ]
        },
        {
          name: 'checklist-model',
          files: [
            'https://cdnjs.cloudflare.com/ajax/libs/checklist-model/0.10.0/checklist-model.min.js'
          ]
        },
        {
          name: 'ui.tinymce',
          files: [
            'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.0.20/tinymce.min.js',
            'static/vendors/angular-ui-tinymce/js/tinymce.js'
          ]
        },
        {
          name: 'ngPrint',
          files: [
            'static/vendors/angular-ui-print/js/ngPrint.js',
            'static/vendors/angular-ui-print/css/ngPrint.css'
          ]
        },
        {
          name: 'ngFileUpload',
          files: [
            'static/bower_components/ng-file-upload-bower/ng-file-upload.min.js',
            'static/bower_components/ng-file-upload-bower/ng-file-upload-shim.min.js'
          ]
        }
      ]
    });
  }]);