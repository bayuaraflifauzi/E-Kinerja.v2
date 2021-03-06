(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratPengantarController', SuratPengantarController);

    
    function SuratPengantarController(EkinerjaService, SuratPengantarService, HakAksesService, 
      $scope, $state, logo_bekasi, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.isi = [{"id": new Date().getTime()}];

        getAllPegawai();

        function getAllPegawai(){
          HakAksesService.GetAllPegawai().then(
            function(response){
              vm.list_pegawai = response;
              vm.loading = false;
            }, function(errResponse){

            })
        }

        vm.openDari = function (pegawai, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataPegawai/dataPegawai.html',
          controller: 'DataPegawaiController',
          controllerAs: 'datapegawai',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            pegawai: function(){
              return vm.list_pegawai;
            },
            pegawaiPilihan: function(){
              return pegawai;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            if(pegawai == 1)
                vm.item.pegawaiPenerima = data;
            else vm.item.pegawaiPembuat = data;
          }, function () {

          });
        };

        $scope.$watch('pegawai', function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        })

        $scope.$watch('pegawaiPenerima', function(){
          if($scope.pegawaiPenerima.length == 18)
            vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawaiPenerima,vm.list_pegawai);
          debugger
        })

        vm.addIsi = function(){
          var data = {"id": new Date().getTime()};
          vm.isi.push(data);
        }

        vm.save = function(){
          vm.item.tembusanSurat = [];
          vm.item.tanggal = vm.item.tanggal.getTime();
          vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
          for(var i = 0; i < vm.tembusanSurat.length; i++)
            vm.item.tembusanSurat.push((i+1) + '. ' + vm.tembusanSurat[i].deskripsi);
          console.log(vm.item);
          SuratPengantarService.save(vm.item).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
            }, function(errResponse){

            })
        }

        vm.back =  function(){
          $state.go('kontrak');
        }


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
            content: [
              {
                image: logo_bekasi,
                width: 90,
                height: 90
              },
              {
                margin: [90, -96, 0, 0],
                table: {
                  widths: [400],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        text: 'PEMERINTAHAN KABUPATEN BEKASI',
                        style: 'header'
                      }
                    ]
                  ]
                }
              },
              {
                margin: [90, -5, 0, 0],
                table: {
                  widths: [400],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
                        style: 'header'
                      }
                    ]
                  ]
                },
              },
              {
                margin: [175, -5, 0, 0],
                table: {
                  widths: [230],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                        style: 'header2'
                      }
                    ]
                  ]
                },
              },
              {
                margin: [115, -5, 0, 0],
                table: {
                  widths: [90, 90, 150],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        text: 'Telp. (021) 89970696',
                        fontSize: 9,
                        alignment: 'right'
                      },{
                        border: [false, false, false, false],
                        text: 'Fax. (021) 89970064',
                        fontSize: 9,
                        alignment: 'center'
                      },{
                        border: [false, false, false, false],
                        text: 'email : diskominfo@bekasikab.go.id',
                        fontSize: 9,
                        alignment: 'left'
                      }
                    ]
                  ]
                },
              },
              {
                margin: [0, 10, 0, 0],
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                      }
                    ]
                  ]
                },
                layout: {
                  fillColor: 'Black'
                }
              },
              {
                text: '' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal),
                margin: [0,20,0,0],
                alignment: 'right',
                fontSize: 10
              },
              {
                margin: [0, 10, 0, 0],
                table: {
                  widths: [100],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        rowSpan: 3,
                        text: 'Yth. ' + vm.item.pegawaiPenerima.nama,
                        fontSize: 10
                      }
                    ],
                    [
                      {
                      }
                    ],
                    [
                      {
                      }
                    ]
                  ]
                }
              },
              {
                margin: [0,30,0,0],
                text: 'SURAT PENGANTAR',
                style: 'header'
              },
              {
                margin: [0,0,0,0],
                text: 'NOMOR : '+ vm.item.nomorSurat +'/' + vm.item.nomorSurat1 + '/'+ vm.item.nomorSurat2 +'/' + ((new Date()).getYear() + 1900),
                fontSize: 10,
                alignment: 'center'
              },
              {
                margin: [0, 20, 0, 0],
                table:{
                  widths: ['auto', 205, 130, 130],
                  body: [
                    [
                      {
                        text: 'No.',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Naskah Dinas yang Dikirimkan',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Banyaknya',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Keterangan',
                        fontSize: 10,
                        alignment: 'center'
                      }
                    ]
                  ]
                }
              },
              {
                margin: [0, 40, 0, 0],
                text: 'Di Terima Tanggal  :',
                fontSize: 10
              },
              {
                margin: [92, -11.5, 0 ,0],
                text: '',
                fontSize: 10
              },
              {
                margin: [0, 30, 0 , 0],
                text: 'Penerima',
                fontSize: 10
              },
              {
                text: '' + vm.item.pegawaiPenerima.jabatan,
                fontSize: 10
              },
              {
                margin: [0, 50, 0, 0],
                text: '' + vm.item.pegawaiPenerima.nama,
                fontSize: 10
              },
              {
                text: '' + vm.item.pegawaiPenerima.nipPegawai,
                fontSize: 10
              },
              {
                margin: [300, -94, 0 , 0],
                text: 'Pengirim',
                fontSize: 10
              },
              {
                margin: [300, 0, 0, 0],
                text: '' + vm.item.pegawaiPembuat.jabatan,
                fontSize: 10
              },
              {
                margin: [300, 54, 0, 0],
                text: '' + vm.item.pegawaiPembuat.nama,
                fontSize: 10
              },
              {
                margin: [300, 0, 0, 0],
                text: ''+ vm.item.pegawaiPembuat.nipPegawai,
                fontSize: 10
              },
              {
                margin: [0, 40, 0, 0],
                text: 'No. Telephone  :',
                fontSize: 10
              },
              {
                margin: [78, -11.5, 0 ,0],
                text: '' + vm.item.telepon,
                fontSize: 10
              }
            ],
            styles: {
              header: {
                bold: true,
                fontSize: 15,
                alignment: 'center'
              },
              header2: {
                fontSize: 10,
                alignment: 'center'
              }
            }
          };
          for(var i = 0; i < vm.isi.length; i++)
            vm.docDefinition.content[10].table.body.push([
                      {
                        text: '' + (i+1),
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: '' + vm.isi[i].naskah,
                        fontSize: 10
                      },
                      {
                        text: '' + vm.isi[i].qty,
                        fontSize: 10
                      },
                      {
                        text: '' + vm.isi[i].keterangan,
                        fontSize: 10
                      }
                    ]);
          console.log(vm.docDefinition.content[10]);

        }

        $scope.openPdf = function() {
          var blb;
          // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
          //     // turn buffer into blob
          //     blb = buffer;
          // });
          // blb = new Blob(blb);
          console.log(vm.item.pembukaSurat);
          template();
          pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();