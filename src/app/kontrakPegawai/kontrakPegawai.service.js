 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('KontrakPegawaiService',
    ['$http', 'API', '$q', 'API_REPORT',
    function ($http, API, $q, API_REPORT) {
        var service = {}; 
        service.GetUrtugByJabatan = function (kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-all-urtug-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllTemplate = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-all-template/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllHistory = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API_REPORT + 'get-report-nodin-history-by-nip/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetHistory = function (kdHistory) {
            var deferred = $q.defer();
            $http.get(API_REPORT + 'get-nodin-document-by-history/' + kdHistory).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugNonDPA = function (nipPegawai, kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-non-dpa-by-jabatan/' + kdJabatan + '/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugDPA = function (nipPegawai, kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-dpa-pegawai/' + nipPegawai + '/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugProgram = function (nipPegawai, kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-program-pegawai/' + nipPegawai + '/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugKegiatan = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'get-kegiatan-pegawai-by-urtug/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugProgram = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-program-pegawai-by-urtug-jabatan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPejabatPenilai = function(kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-pejabat-penilai/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugByNip = function(nip) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-pegawai-tahunan-by-nip/' + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugKegiatanApproval = function(nip, kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-kegiatan-pegawai-approval/' + nip + '/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugProgramApproval = function(nip, kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-program-pegawai-approval/' + nip + '/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ChooseUrtug = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-daftar-uraian-tugas-pegawai-tahunan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ApproveKegiatan = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'change-status-urtug-kegiatan-pegawai-approval/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetHistoryInstruksi = function (nip) {
            debugger
            var deferred = $q.defer();
            $http.get(API + 'get-surat-instruksi-by-pembuat/' + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDataInstruksi = function (kdSurat) {
            debugger
            var deferred = $q.defer();
            $http.get(API + 'get-dokumen-surat-instruksi/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UploadTemplateData = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-template-lain-data/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UploadTemplateFile = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-template-lain-file/', data, {
                    headers : {
                        'Content-Type' : undefined
                    }}).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.SearchTemplate = function(template, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].nmTemplate.toLowerCase().search(template.toLowerCase()) != -1) {
                    result.push(array[i]);
                }
            }
            return result;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
