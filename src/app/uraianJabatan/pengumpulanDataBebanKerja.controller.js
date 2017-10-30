(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PengumpulanDataBebanKerjaController', PengumpulanDataBebanKerjaController);

    function PengumpulanDataBebanKerjaController(PengumpulanDataBebanKerjaService, $uibModal,$state, $document, $scope, EkinerjaService) {
      var vm = this;
      vm.loading = true;
      vm.loadUrtug = true;
      // console.log(JSON.stringify($.parseJSON(sessionStorage.getItem('credential'))));

      // EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      vm.list_jabatan = [];
      vm.list_available_urtug = [];
      vm.list_used_urtug = [];
      vm.unit = $.parseJSON(sessionStorage.getItem('credential')).unit;
      vm.unit = vm.unit.toUpperCase();
      // $scope.jabatan = '';
      // $scope.searchName = '';
      // vm.jabatan;

      getAllJabatanByUnitKerja();
      getAllPegawaiByUnitKerja();
      // getUrtugByJabatan();

      $scope.$watch('jabatan', function(){
      	if($scope.jabatan.length == 8 || $scope.jabatan.length == 7){
      		vm.loadUrtug = true;
      		vm.loadUrJab = true;
      		findJabatan();
      		getUrtugByJabatan();
      		getPejabatPenilai();
      	}
      });

      $scope.$watch('choosen_urtug', function(){
      	if($scope.choosen_urtug.length == 13){
      		debugger
      		getUrtugKegiatanByJabatan();
      	}
      });

      vm.tambahPj = function(){
      	var tugas = PengumpulanDataBebanKerjaService.GetUrtugStatus(vm.list_jenis_urtug, $scope.choosen_urtug);
      	$state.go('sk', {
      		"kdUrtug": $scope.choosen_urtug,
      		"kdJenis": tugas.kdJenisUrtug,
      		"kdJabatan": $scope.jabatan,
      		"tahun": tugas.tahunUrtug
      	});
      }

      function getUrtugKegiatanByJabatan(){
      	vm.loadUrtug = true;
      	var tugas = PengumpulanDataBebanKerjaService.GetUrtugStatus(vm.list_jenis_urtug, $scope.choosen_urtug);
  		var data = {
  			"kdUrtug": $scope.choosen_urtug,
  			"kdJabatan": $scope.jabatan,
  			"kdJenisUrtug": tugas.kdJenisUrtug,
  			"tahunUrtug": tugas.tahunUrtug,
  			"kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
  		};
  		PengumpulanDataBebanKerjaService.GetUrtugKegiatanByJabatan(data).then(
  			function(response){
  				vm.dataLookKegiatan = response;
  				vm.loadUrtug = false;
  				pagingKegiatan();
  			}, function(errResponse){

  			})
      }

      function getAllPegawaiByUnitKerja(){
      	PengumpulanDataBebanKerjaService.GetAllPegawaiByUnitKerja($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
      		function(response){
      			vm.list_pegawai = response;
      		}, function(errResponse){

      		})
      }

      function getAllJabatanByUnitKerja(){
      	console.log(sessionStorage.getItem('credential'));
      	vm.loading = true;
      	PengumpulanDataBebanKerjaService.GetAllJabatanByUnitKerja($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
      		function(response){
      			vm.list_jabatan = response;
      			vm.loading = false;
      			vm.loadUrtug = false;
      		}, function(errResponse){
      			vm.loading = true;
      		}
      	)
      }

      function findJabatan(){
      	vm.jabatan = 
      		EkinerjaService.findJabatanByKdJabatan($scope.jabatan, vm.list_jabatan);
      		// debugger
      }

      function getPejabatPenilai(){
      	PengumpulanDataBebanKerjaService.GetPejabatPenilai($scope.jabatan).then(
      		function(response){
      			vm.penilai = response;
      		}, function(errResponse){

      		})
      }

      function parseMoney(){
      	for(var i = 0; i < vm.dataLook.length;i++)
      		vm.dataLook[i].biaya = EkinerjaService.FormatRupiah(vm.dataLook[i].biaya);
      }

      function collectUsedUrtug(){
      	for(var i = 0; i<vm.list_used_urtug.length;i++)
		  	vm.urtug_used.push(vm.list_used_urtug[i].uraianTugas);
      }

      function getUrtugByJabatan(){
      	vm.loadUrtug = true;
      	PengumpulanDataBebanKerjaService.GetUrtugByJabatan($scope.jabatan).then(
      		function(response){
      			if(response.jabatanUraianTugasList == undefined)
      				vm.list_used_urtug = [];
      			else vm.list_used_urtug = response.jabatanUraianTugasList;
      			vm.list_available_urtug = response.notJabatanUraianTugasList;
      			vm.dataLook = vm.list_used_urtug;
      			vm.urtug_used = [];
      			parseMoney();
      			collectUsedUrtug();
      			getJenisUrtugJabatan();
      			vm.loadUrtug = false;
      			vm.loadUrJab = false;
      			paging();
      			// console.log(JSON.stringify(PengumpulanDataBebanKerjaService.SetDataUrtug(vm.list_used_urtug, vm.list_available_urtug)));
      		}, function(errResponse){
      			vm.loadUrJab = false;
      		}
      	)
      }

      function getJenisUrtugJabatan(){
      	PengumpulanDataBebanKerjaService.GetJenisUrtugJabatan($scope.jabatan).then(
      		function(response){
      			vm.dataLookJenis = response;
      			vm.list_jenis_urtug = response;
      			// debugger
      			pagingJenis();
      		}, function(errResponse){

      		})
      }

      vm.deleteUrtug = function(kdUrtug){
      	PengumpulanDataBebanKerjaService.DeleteUrtugJabatan(vm.jabatan.kdJabatan, kdUrtug)
      		.then(function(response){
      			EkinerjaService.showToastrSuccess('Urtug Berhasil Dihapus');
      			getUrtugByJabatan();
      		},function(errResponse){
      			EkinerjaService.showToastrError('Gagal Menghapus Urtug');
      		})
      }

      vm.deleteUrtugJenis = function(data){
      	console.log(data);
      	PengumpulanDataBebanKerjaService.DeleteJenisUrtug(data)
      		.then(function(response){
      			EkinerjaService.showToastrSuccess('Urtug Berhasil Dihapus');
      			getUrtugByJabatan();
      		},function(errResponse){
      			EkinerjaService.showToastrError('Gagal Menghapus Urtug');
      		})
      }

      vm.open = function (items, parentSelector) {
	      // console.log(items);
		  	// var urtug_used = [];
	      // if(items == undefined){
		      var item = {
		      	"kdJabatan": $scope.jabatan,
		      	"createdBy": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
		      	"kuantitas": 0,
		      	"satuanKuantitas": ' ',
		      	"kualitas": 0,
		      	"waktu": 0,
		      	"biaya": 0
		      };
		      // var stat = 'create';
		  // }
		  // else {
		  // 	var item = angular.copy(items);
		  // 	var stat = 'edit';
		  // 	item.kdJabatan = $scope.jabatan;
		  // 	item.createdBy = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
		  // 	item.kdUrtug = item.uraianTugas.deskripsi;
		  // 	item.kdJenisUrtug = item.jenisUraianTugas.kdJenisUrtug;
		  // 	var biaya = item.biaya.split(".");
		  // 	item.biaya = '';
		  // 	for(var i = 0; i<biaya.length;i++) item.biaya += biaya[i];
	   //    	console.log(item.biaya);
	   //    	console.log(biaya);
		  // 	item.biaya = parseInt(item.biaya);
		  // 	for(var i = 0; i<vm.list_used_urtug.length;i++)
		  // 		urtug_used.push(vm.list_used_urtug[i].uraianTugas);
		  // }
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	        // console.log(urtug_used);
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/tambahUraianTugas/tambahUraianTugas.html',
	        controller: 'TambahUraianController',
	        controllerAs: 'form_urtug_jabatan',
	        // windowClass: 'app-modal-window',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          },
	          available_urtug: function(){
	          	return vm.list_available_urtug;
	          },
	          jabatan: function(){
	          	return vm.jabatan.jabatan;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// showToastrSuccess('ditambahkan');
	      	getUrtugByJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    vm.kegiatan = function (parentSelector) {
	      var tugas = PengumpulanDataBebanKerjaService.GetUrtugStatus(vm.list_jenis_urtug, $scope.choosen_urtug);
	      var item = {
	      	"kdJabatan": $scope.jabatan,
	      	"kdUrtug": tugas.kdUrtug,
	      	"kdJenisUrtug": tugas.kdJenisUrtug,
	      	"tahunUrtug": tugas.tahunUrtug
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
	          	return vm.list_pegawai;
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

	    vm.status = function (tahun, parentSelector) {
	      // console.log(items);
	      var item = {
	      	"kdJabatan": vm.jabatan.kdJabatan,
	      	"tahunUrtug": tahun
	      	// "kdUrtug": items.kdUrtug,
	      	// "kdJenisUrtug": items.kdJenisUrtug
	      };
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/tambahStatus/tambahStatus.html',
	        controller: 'TambahStatusController',
	        controllerAs: 'status',
	        // windowClass: 'app-modal-window',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          },
	          used_urtug: function(){
	          	return vm.urtug_used;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
      		getJenisUrtugJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    vm.changePenilai = function (parentSelector) {
	      // console.log(items);
	      var item = {
	      	"kdJabatanDinilai": vm.jabatan.kdJabatan
	      	// "kdUrtug": items.kdUrtug,
	      	// "kdJenisUrtug": items.kdJenisUrtug
	      };
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/pilihPenilai/pilihPenilai.html',
	        controller: 'PilihPenilaiController',
	        controllerAs: 'penilai',
	        // windowClass: 'app-modal-window',
	        // size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          },
	          pegawai: function(){
	          	return vm.list_pegawai;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
      		getJenisUrtugJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    vm.addSop = function (kdUrtug, parentSelector) {
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/tambahSOP/formSop.html',
	        controller: 'FormSOPController',
	        controllerAs: 'sop',
	        // windowClass: 'app-modal-window',
	        // size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          kdUrtug: function () {
	            return kdUrtug;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
      		// getJenisUrtugJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    $scope.$watch('searchName', function(){
			if($scope.searchName != '')
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.list_used_urtug);
			else vm.dataLook = vm.list_used_urtug;
			// debugger
			paging();
		})

	    function paging(){ 
	          $scope.filteredData = [];
	          $scope.currentPage = 0;
	          $scope.numPerPage = 25;
	          $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
	          function page(){
	            $scope.page = [];
	            for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
	                $scope.page.push(i+1);
	            }
	          }
	          page();
	          $scope.pad = function(i){
	            $scope.currentPage += i;
	          }

	          $scope.max = function(){
	            if($scope.currentPage >= $scope.maxSize - 1)
	                return true;
	            else return false;
	          }

	          $scope.$watch("currentPage + numPerPage", function() {
	            var begin = (($scope.currentPage) * $scope.numPerPage)
	            , end = begin + $scope.numPerPage;

	            $scope.filteredData = vm.dataLook.slice(begin, end);
	          });
	        }

	    function pagingJenis(){ 
	          $scope.filteredDataJenis = [];
	          $scope.currentPageJenis = 0;
	          $scope.numPerPage = 25;
	          $scope.maxSizeJenis = Math.ceil(vm.dataLookJenis.length/$scope.numPerPage);
	          function page(){
	            $scope.pageJenis = [];
	            for(var i = 0; i < vm.dataLookJenis.length/$scope.numPerPage; i++){
	                $scope.pageJenis.push(i+1);
	            }
	          }
	          page();
	          $scope.padJenis = function(i){
	            $scope.currentPageJenis += i;
	          }

	          $scope.maxJenis = function(){
	            if($scope.currentPageJenis >= $scope.maxSizeJenis - 1)
	                return true;
	            else return false;
	          }

	          $scope.$watch("currentPageJenis + numPerPage", function() {
	            var begin = (($scope.currentPageJenis) * $scope.numPerPage)
	            , end = begin + $scope.numPerPage;

	            $scope.filteredDataJenis = vm.dataLookJenis.slice(begin, end);
	          });
	        }

	    function pagingKegiatan(){ 
	          $scope.filteredDataKegiatan = [];
	          $scope.currentPageKegiatan = 0;
	          $scope.numPerPage = 25;
	          $scope.maxSizeKegiatan = Math.ceil(vm.dataLookKegiatan.length/$scope.numPerPage);
	          function page(){
	            $scope.pageKegiatan = [];
	            for(var i = 0; i < vm.dataLookKegiatan.length/$scope.numPerPage; i++){
	                $scope.pageKegiatan.push(i+1);
	            }
	          }
	          page();
	          $scope.padKegiatan = function(i){
	            $scope.currentPageJenis += i;
	          }

	          $scope.maxKegiatan = function(){
	            if($scope.currentPageKegiatan >= $scope.maxSizeKegiatan - 1)
	                return true;
	            else return false;
	          }

	          $scope.$watch("currentPageKegiatan + numPerPage", function() {
	            var begin = (($scope.currentPageJenis) * $scope.numPerPage)
	            , end = begin + $scope.numPerPage;

	            $scope.filteredDataKegiatan = vm.dataLookKegiatan.slice(begin, end);
	          });
	        }
   } 
})();