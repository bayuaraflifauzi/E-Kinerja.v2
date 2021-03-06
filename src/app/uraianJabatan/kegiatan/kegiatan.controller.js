(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KegiatanListController', KegiatanListController);

    
    function KegiatanListController(EkinerjaService, $scope, urtug, jabatan, pegawai, isEselon4, $uibModal, $document, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        vm.urtug = urtug;
        vm.isEselon4 = isEselon4;
        getUrtugKegiatanByJabatan();

        function getUrtugKegiatanByJabatan(){
          vm.loadUrtug = true;
          var data = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": jabatan,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          };
          if(isEselon4)
            PengumpulanDataBebanKerjaService.GetUrtugKegiatanByJabatan(data).then(
              function(response){
                vm.kegiatan = response;debugger
                vm.loadUrtug = false;
              }, function(errResponse){

              })
          else 
            PengumpulanDataBebanKerjaService.GetUrtugProgramByJabatan(data).then(
              function(response){
                vm.kegiatan = response;debugger
                vm.loadUrtug = false;
              }, function(errResponse){

              })
        }

        vm.kegiatanadd = function (parentSelector) {
          var item = {
            "kdJabatan": jabatan,
            "kdUrtug": urtug.kdUrtug,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug
          };
          console.log(item);
          var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/uraianJabatan/tambahKegiatan/tambahKegiatan.html',
            controller: 'KegiatanController',
            controllerAs: 'kegiatan',
            // windowClass: 'app-modal-window',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              items: function () {
                return item;
              }, 
              pegawai: function(){
                return pegawai;
              },
              isEselon4: function(){
                return isEselon4;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getUrtugKegiatanByJabatan();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.pj = function (kegiatan, parentSelector) {
          var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/uraianJabatan/penanggungjawab/penanggungjawab.html',
            controller: 'PJController',
            controllerAs: 'pj',
            // windowClass: 'app-modal-window',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              urtug: function () {
                return urtug;
              }, 
              jabatan: function(){
                return jabatan;
              },
              kegiatan: function(){
                return kegiatan;
              },
              isEselon4: function(){
                return isEselon4;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getUrtugKegiatanByJabatan();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.openDetailUrtug = function (urtug) {
          urtug.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          PengumpulanDataBebanKerjaService.GetUrtugKegiatan(urtug).then(
            function(response){debugger
              var dataUrtug = response;
              console.log(response);
              var modalInstance = $uibModal.open({
                  animation: true,
                  ariaLabelledBy: 'modal-title',
                  ariaDescribedBy: 'modal-body',
                  templateUrl: 'app/uraianJabatan/detailUrtug/detailUrtug.html',
                  controller: 'DetailUrtugController',
                  controllerAs: 'detailUrtug',
                  resolve: {
                    urtug: function(){
                      return dataUrtug;
                    }
                  }
                  // windowClass: 'app-modal-window',
                  // size: 'lg',
              });

              modalInstance.result.then(function () {
              }, function () {

              });
            }, function(errResponse){

            })
        };

        vm.deleteKegiatanOrProgram = function(data){
            if (isEselon4){
                console.log(data);
                PengumpulanDataBebanKerjaService.DeleteUrtugKegiatan(data)
                    .then(function(response){
                        EkinerjaService.showToastrSuccess('Kegiatan Berhasil Dihapus');
                        getUrtugKegiatanByJabatan();
                    },function(errResponse){
                        EkinerjaService.showToastrError('Gagal Menghapus Urtug');
                    })
            } else {
                console.log(data);
                PengumpulanDataBebanKerjaService.DeleteUrtugProgram(data)
                    .then(function(response){
                        EkinerjaService.showToastrSuccess('Program Berhasil Dihapus');
                        getUrtugKegiatanByJabatan();
                    },function(errResponse){
                        EkinerjaService.showToastrError('Gagal Menghapus Urtug');
                    })
            }
        };

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();