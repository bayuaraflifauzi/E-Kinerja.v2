(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('UploadTemplateController', UploadTemplateController);


    function UploadTemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, 
        $scope, $state, urtug, isDPA, API, $http) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        vm.data = {};
        
        vm.urtug=urtug;
        vm.isDPA=isDPA;
        vm.data.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        vm.data.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        vm.data.kdUrtug = vm.urtug.kdUrtug;
        vm.data.kdJabatan = $.parseJSON(sessionStorage.getItem('credential')).kdJabatan;
        vm.data.tahunUrtug = urtug.tahunUrtug;

        $scope.uploadPic = function(files) {
            console.log(files[0].name);
            vm.data.namaFile = files[0].name;
            vm.data.keterangan = vm.item.keterangan;
            vm.data.durasiPengerjaan = vm.item.durasipenyelesaian;
            vm.extension = vm.data.namaFile.split('.');
            vm.extension = vm.extension[vm.extension.length - 1];
            vm.file = files[0];
        }
 
        vm.uploadTemplate = function () {debugger
            KontrakPegawaiService.UploadTemplateData(vm.data).then(
                function(response){
                    var namaFile = response.message + '.' + vm.extension; debugger;
                    var formData = new FormData();
                    formData.append('file', vm.file, namaFile);

                    KontrakPegawaiService.UploadTemplateFile(formData).then(
                        function(response){debugger
                            EkinerjaService.showToastrSuccess("File Berhasil Diupload");
                            $uibModalInstance.close();
                        }, function(errResponse){

                        })
                }, function(errResponse){

                })
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.reset = function(){
            vm.item = angular.copy(items);
        };
    }
})();