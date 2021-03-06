(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PetunjukController', PetunjukController);

    
    function PetunjukController(EkinerjaService, PedomanService, HakAksesService, $scope, 
      $state, logo_bekasi, logo_garuda, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.openDari = function (parentSelector) {
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
              return vm.item.pegawaiPembuat;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pegawaiPembuat = data;
          }, function () {

          });
        };

        if($state.current.name == 'petunjuknonpejabat')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.isiPetunjuk = [
              {
                "bab": "BAB I",
                "judul": "PENDAHULUAN",
                "subab": [
                  {
                    "nomor": "A",
                    "judul": "Latar Belakang",
                    "isi": ""
                  },
                  {
                    "nomor": "B",
                    "judul": "Maksud dan Tujuan",
                    "isi": ""
                  },
                  {
                    "nomor": "C",
                    "judul": "Ruang Lingkup",
                    "isi": ""
                  },
                  {
                    "nomor": "D",
                    "judul": "Pengertian Umum",
                    "isi": ""
                  }
                ]
              }
        ];

        getAllPegawai();

        function getAllPegawai(){
          HakAksesService.GetAllPegawai().then(
            function(response){
              vm.list_pegawai = response;
              vm.loading = false;
            }, function(errResponse){

            })
        }

        $scope.$watch('pegawai', function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        })

        function addBab() {
          var data = {
            "bab" : "BAB " + PedomanService.bab(vm.isiPetunjuk.length),
            "judul": "",
            "subab": []
          };
          vm.isiPetunjuk.push(data);
        }

        function addSubab() {
          var idx = vm.isiPetunjuk.length-1;
          console.log(idx);
          var data = {
            "nomor": String.fromCharCode(65 + vm.isiPetunjuk[idx].subab.length),
            "judul": "",
            "isi": ""
          }
          vm.isiPetunjuk[idx].subab.push(data);
        }

        vm.addElement = function(jenis){
          if(jenis == 1)
            addSubab();
          else
            addBab();
          console.log(jenis);
        }

        vm.save = function(){
        }

        vm.back =  function(){
          $state.go('kontrak');
        }


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
            pageSize: 'A4',
            content: [
                {
                    image: logo_garuda,
                    width: 50,
                    height: 50,
                    alignment: 'center',
                    margin: [0,0,0,5]
                },

                {
                    text: '' + vm.item.pegawaiPembuat.jabatan.toUpperCase(), style: 'nama_judul'
                },

                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                'LAMPIRAN',
                'PERATURAN MENTERI',
                '' + vm.item.namaMenteri.toUpperCase(),
                'REPUBLIK INDONESIA',
                'NOMOR '+ vm.item.nomorSurat + ' TAHUN ' + ((new Date()).getYear() + 1900),
                'TENTANG PETUNJUK PELAKSANAAN ' + vm.item.ttgPetunjuk.toUpperCase(),

                {
                    text: 'PETUNJUK PELAKSANAAN', style: 'nama_judul', margin: [0,15,0,0]
                },
                {
                    text: '' + vm.item.ttgPetunjuk.toUpperCase(), style: 'judul_nomor'
                }

            ],

            styles: {
                nama_judul: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                header1: {
                  bold: true,
                  fontSize: 15,
                  alignment: 'center'
                },
                header2: {
                    fontSize: 10,
                    alignment: 'center'
                },
                judul_nomor: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 11
                },
                tandaTangan: {
                    color: '#000',
                    fontSize: 10,
                    alignment:'right'
                }
            }
        };

          for(var i = 0; i < vm.isiPetunjuk.length; i++){
            var bab =  {
                text: '' + vm.isiPetunjuk[i].bab, style: 'nama_judul', margin: [0,15,0,0]
            };
            var judulBab = {
              text: '' + vm.isiPetunjuk[i].judul.toUpperCase(), style: 'judul_nomor', margin: [0,0,0,5]
            };
            var isi = {
              type: 'upper-alpha', bold: true, margin:[0,0,0,15],
              ol: []
            };
            for(var j = 0; j < vm.isiPetunjuk[i].subab.length; j++)
              isi.ol.push({text:[''+ vm.isiPetunjuk[i].subab[j].judul +'\n', {text:'' + vm.isiPetunjuk[i].subab[j].isi, bold:false}],margin:[0,0,0,10]});
            vm.docDefinition.content.push(bab);
            vm.docDefinition.content.push(judulBab);
            vm.docDefinition.content.push(isi);
          }  
          vm.docDefinition.content.push({
              style: 'tandaTangan',
              table: {
                  widths: [100],
                  body: [
                      [{text: ''+vm.item.pegawaiPembuat.jabatan+',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                      [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                      [{text: '' + vm.item.pegawaiPembuat.nama, alignment : 'left', border: [false, false, false, false]}]
                  ]
              }
          });
          if($state.current.name == "petunjuknonpejabat"){
            vm.docDefinition.content[2] = {
                margin: [0, 10, 0, 15],
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
            };

            vm.docDefinition.content[1] = {
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
                }
            };

            vm.docDefinition.content[0] = {
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
                }
            };
            
            vm.docDefinition.content.unshift({
                margin: [90, -5, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: '' + vm.item.pegawaiPembuat.unitKerja.toUpperCase(),
                                style: 'header1'
                            }
                        ]
                    ]
                }
            });

            vm.docDefinition.content.unshift({
                margin: [90, -96, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                style: 'header1'
                            }
                        ]
                    ]
                }
            });

            vm.docDefinition.content.unshift({
                image: logo_bekasi,
                width: 90,
                height: 90
            });
          }
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