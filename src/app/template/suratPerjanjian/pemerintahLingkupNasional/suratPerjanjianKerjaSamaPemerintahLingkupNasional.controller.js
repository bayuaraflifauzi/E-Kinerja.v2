(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratPerjanjianKerjaSamaPemerintahLingkupNasionalController', SuratPerjanjianKerjaSamaPemerintahLingkupNasionalController);

    function SuratPerjanjianKerjaSamaPemerintahLingkupNasionalController(EkinerjaService, SuratPerjanjianKerjaSamaPemerintahLingkupNasionalService, HakAksesService, $scope, $state) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.item.tahun = ((new Date()).getYear() + 1900);

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        text: 'KERJA SAMA ANTARA', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' + vm.item.namainstansi1.toUpperCase(), style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'DAN', style: 'nama_judul', margin: [0,10,0,0]
                    },
                    {
                        text: '' + vm.item.namainstansi2.toUpperCase(), style: 'nama_judul', margin: [0,10,0,0]
                    },

                    {
                        text: 'TENTANG', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' + vm.item.tentang.toUpperCase(), style: 'judul_nomor'
                    },

                    {
                        text: 'NOMOR : ' + '' + vm.item.nomorSurat1, style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'NOMOR : ' + '' + vm.item.nomorSurat2, style: 'nama_judul', margin: [0,5,0,20]
                    },

                    {
                        bold:true,
                        margin:[0,0,0,15],
                        ol: [
                            {
                                widths: ['*', '*', '*'], margin:[0,0,0,10],
                                table: {
                                    body: [
                                        [
                                            {text: 'Nama'},
                                            {text: ':'},
                                            {text: '' + vm.item.namapihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: '' + vm.item.nippihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: '' + vm.item.golonganpihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: '' + vm.item.jabatanpihakkesatu, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KESATU.', bold:true}
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                widths: ['*', '*', '*'], margin:[0,0,0,5],
                                table: {
                                    body: [
                                        [
                                            {text: 'Nama'},
                                            {text: ':'},
                                            {text: '' + vm.item.namapihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: '' + vm.item.nippihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: '' + vm.item.golonganpihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: '' + vm.item.jabatanpihakkedua, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KEDUA.', bold:true}
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },

                    {
                        margin:[0,0,0,15],
                        text:[
                            {text:'Kedua belah pihak sepakat untuk mangadakan kerja sama dalam rangka '},
                            {text:'' + vm.item.tentang.toUpperCase()},
                            {text:' dengan ketentuan sebagai berikut.'}
                        ]
                    },


                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 1\n', style: 'nama_judul'},
                            {text: 'TUJUAN KERJASAMA\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.tujuan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 2\n', style: 'nama_judul'},
                            {text: 'RUANG LINGKUP KERJASAMA\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.ruanglingkup, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 3\n', style: 'nama_judul'},
                            {text: 'PELAKSANAAN KEGIATAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.pelaksanaankegiatan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 4\n', style: 'nama_judul'},
                            {text: 'PEMBIAYAAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.pembiayaan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 5\n', style: 'nama_judul'},
                            {text: 'PENYELESAIAN PERSELISIHAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.penyelesaianperselisihan, alignment:'justify'}]
                    },

                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 6\n', style: 'nama_judul'},
                            {text: 'LAIN-LAIN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.lainlain, alignment:'justify'}]
                    },

                    {
                        margin: [0,0,0,30],
                        text: [
                            {text: 'Pasal 7\n', style: 'nama_judul'},
                            {text: 'PENUTUP\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.penutup, alignment:'justify'}]
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: ['*','*','*'],
                            body: [
                                [{text: '' + vm.item.namainstansi2.toUpperCase() + ',', bold: true, alignment: 'center'},{},{text: '' + vm.item.namainstansi1.toUpperCase() + ',', bold: true, alignment: 'center'}],
                                [{text: 'PIHAK KEDUA,', bold: true, alignment: 'center'},{},{text: 'PIHAK KESATU,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: '' + vm.item.namapihakkedua.toUpperCase(), alignment: 'center'}, {}, {text: '' + vm.item.namapihakkesatu.toUpperCase(), alignment: 'center'}]
                            ]
                        },
                        layout: 'noBorders'
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
                    },
                    nama_judul: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 12
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