(function(){
	'use strict';

	angular.module('eKinerja').service('DashboardService', DashboardService);

	function DashboardService(API, $http, $q){
		var service = {};

		service.GetDisposisi = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-lembar-disposisi-target-unread/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetInstruksi = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-instruksi-pegawai-unread/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPerintah = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-daftar-surat-perintah-target-unread/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ChangeRead = function (kdLembar, nip) {
            var deferred = $q.defer();
            $http.put(API + 'open-lembar-disposisi/' + kdLembar + "/" + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ChangeReadPerintah = function (kdLembar, nip) {
            var deferred = $q.defer();
            $http.put(API + 'open-surat-perintah-pegawai/' + kdLembar + "/" + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ChangeReadInstruksi = function (kdLembar, nip) {
            var deferred = $q.defer();
            $http.put(API + 'open-surat-instruksi-pegawai/' + kdLembar + "/" + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetLaporanLain = function (nama, ekstensi, kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-template-lain-file-revisi/' + nama + "/" + ekstensi + '/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        return service;
	}
})();