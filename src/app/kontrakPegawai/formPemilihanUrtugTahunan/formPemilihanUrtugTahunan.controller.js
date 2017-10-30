(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPemilihanUrtugTahunanController', FormPemilihanUrtugTahunanController);

    
    function FormPemilihanUrtugTahunanController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $document, $uibModal) {
      	var vm = this;

        getUrtug();

        function getUrtug(){
          KontrakPegawaiService.GetUrtugNonDPA($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.urtugNonDpa = response; debugger
            }, function(errResponse){

            }
          );

          KontrakPegawaiService.GetUrtugDPA(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){
              vm.urtugDpa = response; debugger
              for(var i = 0; i < response.length; i++)
                vm.urtugDpa[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.urtugDpa[i].paguAnggaran);
            }, function(errResponse){

            }
          );
        }

        vm.openKegiatan = function (item, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/kontrakPegawai/detailUrtugDpa/detailUrtugDpa.html',
          controller: 'DetailUrtugDpaController',
          controllerAs: 'urtugkegiatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            urtug: function () {
              return item;
            }
          }
          });

          modalInstance.result.then(function () {

          }, function () {

          });
        };

        vm.save = function(){
          
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();