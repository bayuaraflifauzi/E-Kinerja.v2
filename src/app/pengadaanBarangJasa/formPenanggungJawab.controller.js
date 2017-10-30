(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPenanggungJawabController', FormPenanggungJawabController);

    
    function FormPenanggungJawabController(EkinerjaService, items, pegawai, PengadaanBarangJasaService, $uibModalInstance) {
      	var vm = this;
        vm.pj = {};
        vm.list_pegawai = pegawai;
        getAllStatusPJ();

        function getAllStatusPJ(){
          PengadaanBarangJasaService.GetStatusPJ(items).then(
            function(response){
              vm.datajabatan = response; debugger
            }, function(errResponse){

            })
        }

        vm.save = function(){
          items.nipPegawai = vm.pj.nipPegawai;
          items.kdStatusPenanggungJawab = vm.pj.jabatan;
          console.log(items);
          PengadaanBarangJasaService.AddPJ(items).then(
            function(response){
      				$uibModalInstance.close();
              // setPJ();
            }, function(errResponse){

            })
          // vm.item
          // console.log(JSON.stringify(vm.item));
          // PengadaanBarangJasaService.SetUrtugAndJabatan(vm.item).then(
          //  function(response){
      		// 	},function(errResponse){
        //       EkinerjaService.showToastrError('terjadi kesalahan');
      		// 	}
      		// )
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();