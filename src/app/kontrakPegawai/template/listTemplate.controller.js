(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TemplateController', TemplateController);

    
    function TemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $uibModal, $document, $state, urtug, isDPA) {
      	var vm = this;

        getAllTemplate();

        function getAllTemplate(){
          KontrakPegawaiService.GetAllTemplate().then(
            function(response){
              vm.template = response;
            }, function(errResponse){

            })
        }

        vm.gotoTemplate = function(url){
          $uibModalInstance.close();
          console.log(url);
          $state.go(url);
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        vm.openUploadTemplate = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/kontrakPegawai/uploadTemplate/uploadTemplate.html',
                controller: 'UploadTemplateController',
                controllerAs: 'uptemp',
                // windowClass: 'app-modal-window',
                // size: 'lg',
                appendTo: parentElem,
                resolve: {
                    urtug: function () {
                        return urtug;
                    },
                    isDPA: function () {
                        return isDPA;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };
   	} 
})();