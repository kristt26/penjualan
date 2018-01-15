angular.module("Ctrl", [])

.controller("MainController", function($scope, $http, SessionService) {
    /*$scope.Init = function() {
        //Auth
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'login.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })
    }
    */
})

.controller("KategoriController", function($scope, $http, SessionService) {
    $scope.DataKategoris = [];
    $scope.DataInput = {};
    $scope.SelectedItem = {};
    $scope.Init = function() {
        //Data Kategori
        var UrlKategori = "api/datas/Select/kategori.php";
        $http({
                method: "get",
                url: UrlKategori,
            })
            .then(function(response) {
                $scope.DataKategoris = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.InsertKategori = function() {
        var urlinsertkategori = "api/datas/Create/readKategori.php";
        var Data = $scope.DataInput;
        $http({
                method: "post",
                url: urlinsertkategori,
                data: Data
            })
            .then(function(response) {
                if (response.data.message != 0) {
                    Data.IdKategori = response.data.message;
                    $scope.DataKategoris.push(angular.copy(Data));
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.Massage);
            })
    }

    $scope.Selected = function(item) {
        $scope.SelectedItem = item;
    }

    $scope.UpdateKategori = function() {
        var urlupdatekategori = "api/datas/Update/updateKategori.php";
        var Data = $scope.SelectedItem;
        $http({
                method: "post",
                url: urlupdatekategori,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Bidang was updated") {
                    angular.forEach($scope.DataKategoris, function(value, key) {
                        if (value.IdKategori == Data.IdKategori) {
                            value.NamaKategori = Data.NamaKategori;
                        }
                    });
                } else
                    alert("Data Gagal Dirubah");
            }, function(error) {
                alert(error.Massage);
            })
    }
})


.controller("LogoutController", function($scope, $http) {
    $scope.Init = function() {
        var Urlauth = "api/datas/logout.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.message == true) {
                    window.location.href = 'index.html';
                }
            }, function(error) {
                alert(error.message);
            })
    }

})

.controller("pegawaiController", function($scope, $http, $rootScope, SessionService) {

})

.controller("BarangController", function($scope, $http, SessionService) {
    $scope.DatasBarang = [];
    //$rootScope.Session = {};
    $scope.DataInputBarang = {};
    $scope.SelectedItem = {};
    $scope.InputBarang = {};
    $scope.DataKategoris = [];
    $scope.SelectedItemKategori = {};

    $scope.Init = function() {
        //Auth
        var UrlKategori = "api/datas/Select/kategori.php";
        $http({
                method: "get",
                url: UrlKategori,
            })
            .then(function(response) {
                $scope.DataKategoris = response.data.records;
                var UrlBarang = "api/datas/Select/readBarang.php";
                $http({
                        method: "get",
                        url: UrlBarang
                    })
                    .then(function(response) {
                        $scope.DatasBarang = response.data.records;
                        angular.forEach($scope.DataKategoris, function(valuekategori, keykategori) {
                            angular.forEach($scope.DatasBarang, function(valueBarang, keyBarang) {
                                if (valueBarang.KategoriId == valuekategori.IdKategori) {
                                    valueBarang.NamaKategori = valuekategori.NamaKategori;
                                }
                            })
                        })

                    }, function(error) {

                        alert(error.message);
                    })
            }, function(error) {
                alert(error.message);
            })




    }

    //Insert Data Bidang
    $scope.InsertBarang = function() {
        $scope.InputBarang.KategoriId = $scope.SelectedItemKategori.IdKategori;
        var urlinsertbarang = "api/datas/Create/createBarang.php";
        var Data = $scope.InputBarang;
        $http({
                method: "post",
                url: urlinsertbarang,
                data: Data
            })
            .then(function(response) {
                if (response.data.message != 0) {
                    Data.IdBarang = response.data.message;
                    Data.NamaKategori = $scope.SelectedItemKategori.NamaKategori;
                    $scope.DatasBarang.push(angular.copy(Data));
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.Massage);
            })

    }


    $scope.Selected = function(item) {
        $scope.DataSelected = item;
    }

    //Funsi Update Bidang
    $scope.UpdateDataBidang = function() {
        var Data = $scope.DataSelected;
        var UrlUpdateBidang = "api/datas/updateBidang.php";
        $http({
                method: "post",
                url: UrlUpdateBidang,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Bidang was updated") {
                    angular.forEach($scope.DatasBidang, function(value, key) {
                        if (value.IdBidang == Data.IdBidang) {
                            value.NamaBidang = Data.NamaBidang;
                            value.KepalaBagian = Data.KepalaBagian;
                            alert(response.data.message);
                        }
                    })
                } else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }

})

.controller("SupplierController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasSupplier = [];
    $scope.InputSupplier = {};
    $scope.SelectedItem = {};
    $scope.Init = function() {
        //Auth
        var UrlSupplier = "api/datas/Select/readSupplier.php";
        $http({
                method: "get",
                url: UrlSupplier,
            })
            .then(function(response) {
                $scope.DatasSupplier = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.InsertSupplier = function() {
        var UrlInsertSupplier = "api/datas/Create/createSupplier.php";
        var Data = $scope.InputSupplier;
        $http({
                method: "post",
                url: UrlInsertSupplier,
                data: Data
            })
            .then(function(response) {
                if (response.data.message != 0) {
                    Data.IdSupplier = response.data.message;
                    $scope.DatasSupplier.push(angular.copy(Data));
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.Massage);
            })
    }

    $scope.Selected = function(item) {
        $scope.SelectedItem = item;
    }

    $scope.UpdateSupplier = function() {
        var urlupdateSupplier = "api/datas/Update/updateSupplier.php";
        var Data = $scope.SelectedItem;
        $http({
                method: "post",
                url: urlupdateSupplier,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Bidang was updated") {
                    angular.forEach($scope.DatasSupplier, function(value, key) {
                        if (value.IdSupplier == Data.IdSupplier) {
                            value.NamaSupplier = Data.NamaSupplier;
                            value.Telp = Data.Telp;
                            value.Alamat = Data.Alamat;
                        }
                    });
                } else
                    alert("Data Gagal Dirubah");
            }, function(error) {
                alert(error.Massage);
            })
    }
})


.controller("PembelianController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasPembelian = [];
    $scope.DataKategoris = [];
    $scope.DatasBarang = [];
    $scope.SelectedItemBarang = {};
    $scope.DataItemBarang = [];
    $scope.InputItemBarang = {};
    $scope.SelectedItemBarang = {};
    $scope.InputPenjualan = {};
    $scope.DatasSupplier = [];
    $scope.SelectedItemSupplier = {};
    $scope.ViewDetailBarang = [];
    $scope.InputPenjualan.TotalBayar = 0;

    $scope.Init = function() {
        var UrlKategori = "api/datas/Select/kategori.php";
        $http({
                method: "get",
                url: UrlKategori,
            })
            .then(function(response) {
                $scope.DataKategoris = response.data.records;
            }, function(error) {
                alert(error.message);
            })

        var UrlSupplier = "api/datas/Select/readSupplier.php";
        $http({
                method: "get",
                url: UrlSupplier,
            })
            .then(function(response) {
                $scope.DatasSupplier = response.data.records;
            }, function(error) {
                alert(error.message);
            })

        var UrlreadPembelian = "api/datas/Select/readPembelian.php";
        $http({
                method: "get",
                url: UrlreadPembelian,
            })
            .then(function(response) {
                $scope.DatasPembelian = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.SelectedDetail = function(item) {
        $scope.ViewDetailBarang = item;
    }

    $scope.ChangeBarang = function(item) {
        var Data = item;
        var UrlBarang = "api/datas/Select/readBarangByKategori.php";
        $http({
                method: "post",
                url: UrlBarang,
                data: Data
            })
            .then(function(response) {
                $scope.DatasBarang = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.TambahItemBarang = function() {
        $scope.InputItemBarang.BarangId = $scope.SelectedItemBarang.IdBarang;
        $scope.InputItemBarang.NamaBarang = $scope.SelectedItemBarang.NamaBarang;
        $scope.DataItemBarang.push(angular.copy($scope.InputItemBarang));
        $scope.InputPenjualan.TotalBayar += parseInt($scope.InputItemBarang.Jumlah) * parseInt($scope.InputItemBarang.HargaBeli);

        $scope.SelectedItemKategori = {};
        $scope.SelectedItemBarang = {};
        $scope.InputItemBarang = {};

    }

    $scope.InsertPembelian = function() {
        $scope.InputPenjualan.SupplierId = $scope.SelectedItemSupplier.IdSupplier;
        $scope.InputPenjualan.NamaSupplier = $scope.SelectedItemSupplier.NamaSupplier;
        $scope.InputPenjualan.ItemBarang = $scope.DataItemBarang;
        var UrlInsert = "api/datas/Create/createPembelian.php";
        var Data = $scope.InputPenjualan;

        $http({
                method: "post",
                url: UrlInsert,
                data: Data
            })
            .then(function(response) {
                var NewData = response.data;
                NewData.NamaSupplier = Data.NamaSupplier;
                $scope.DatasPembelian.push(angular.copy(NewData))
                $scope.InputPenjualan = {};
                $scope.SelectedItemSupplier = {};
                $scope.DataItemBarang = [];
                window.location.href = 'admin.html#!/Pembelian';
            }, function(error) {
                alert(error.message);
            })

        $scope.InputPenjualan = {};
        $scope.SelectedItemSupplier = {};
        $scope.DataItemBarang = [];

    }

})

.controller("ReturnController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasReturn = [];
    $scope.Init = function() {
        var UrlReturn = "api/datas/Select/readReturn.php";
        $http({
                method: "get",
                url: UrlReturn,
            })
            .then(function(response) {
                $scope.DatasReturn = response.data.records;
            }, function(error) {
                alert(error.message);
            })
    }

})

.controller("HariLiburController", function($scope, $http, $rootScope, SessionService) {
    $scope.DatasHariLibur = [];
    //$rootScope.Session = {};
    $scope.DataInputHariLibur = {};
    $scope.Init = function() {
        //Auth
        var Urlauth = "api/datas/auth.php";
        $http({
                method: "get",
                url: Urlauth,
            })
            .then(function(response) {
                if (response.data.Session == false) {
                    window.location.href = 'login.html';
                } else
                    $rootScope.Session = response.data.Session;
            }, function(error) {
                alert(error.message);
            })

        //Get Hari Libur
        var UrlAbsen = "api/datas/readHariLibur.php";
        $http({
                method: "get",
                url: UrlAbsen,
            })
            .then(function(response) {
                if (response.data.message != "No Hari Libur found")
                    $scope.DatasHariLibur = response.data.records;
                else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }

    //insert Hari Libur
    $scope.InsertHariLibur = function() {
        var Data = $scope.DataInputHariLibur;
        var UrlInsertHariLibur = "api/datas/createHariLibur.php";
        $http({
                method: "post",
                url: UrlInsertHariLibur,
                data: Data
            })
            .then(function(response) {
                if (response.data.message != "0") {
                    Data.IdHari = response.data.message;
                    $scope.DatasHariLibur.push(angular.copy(Data));
                } else
                    alert("Data Gagal disimpan");
            }, function(error) {
                alert(error.message);
            })
    }

    $scope.Selected = function(item) {
        $scope.DataSelected = item;
    }

    $scope.UpdateDataHariLibur = function() {
        var Data = $scope.DataSelected;
        var UrlUpdateHariLibur = "api/datas/updateHariLibur.php";
        $http({
                method: "post",
                url: UrlUpdateHariLibur,
                data: Data
            })
            .then(function(response) {
                if (response.data.message == "Bidang was updated") {
                    angular.forEach($scope.DatasBidang, function(value, key) {
                        if (value.IdBidang == Data.IdBidang) {
                            value.NamaBidang = Data.NamaBidang;
                            value.KepalaBagian = Data.KepalaBagian;
                            alert(response.data.message);
                        }
                    })
                } else
                    alert(response.data.message);
            }, function(error) {
                alert(error.message);
            })
    }



})

.controller("StatusAbsenController", function($scope, $http) {
    $scope.DatasStatusAbsen = [];
    $scope.DatasPegawai = [];
    $scope.DataJenis = [{ 'jenis': 'Izin' }, { 'jenis': 'Cuti' }, { 'jenis': 'Sakit' }, { 'jenis': 'DL' }];
    $scope.DataInput = {};
    $scope.SelectedItemPegawai = {};
    $scope.SelectedJenis = {};
    $scope.DataSelected = {};
    $scope.Init = function() {
        //Get Data Pegawai
        var UrlPegawai = "api/datas/readPegawai.php";
        $http({
                method: "get",
                url: UrlPegawai
            })
            .then(function(response) {
                $scope.DatasPegawai = response.data.records;
            }, function(error) {
                alert(error.message);
            })

        //Get Data Status
        var UrldataStatus = "api/datas/readStatusAbsen.php";
        $http({
                method: "get",
                url: UrldataStatus
            })
            .then(function(response) {
                $scope.DatasStatusAbsen = response.data.records;
            }, function(error) {
                alert(error.message);
            })

    }

    $scope.Selected = function(item) {
        $scope.DataSelected = item;
        angular.forEach($scope.DatasPegawai, function(value, key) {
            if (value.Nip == item.Nip) {
                $scope.SelectedItemPegawai = value;
            }
        })
        $scope.SelectedJenis.jenis = item.Jenis;

    }

    $scope.InsertStatusAbsen = function() {
        $scope.DataInput.Nip = $scope.SelectedItemPegawai.Nip;
        $scope.DataInput.Nama = $scope.SelectedItemPegawai.Nama;
        $scope.DataInput.Jenis = $scope.SelectedJenis.jenis;
        var Data = $scope.DataInput;
        var UrlStatus = "api/datas/createStatusAbsen.php";
        $http({
                method: "post",
                url: UrlStatus,
                data: Data
            })
            .then(function(response) {
                if (response.data.message > 1) {
                    Data.Id = response.data.message;
                    $scope.DatasStatusAbsen.push(Data);
                }
            }, function(error) {
                alert(error.message);
            })

        $scope.SelectedItemPegawai = {};
        $scope.SelectedJenis = {};
    }

});