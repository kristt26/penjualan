var app = angular.module("app", ["ngRoute", "Ctrl"]);
app.config(function($routeProvider) {  
    $routeProvider   
        .when("/Main", {
            templateUrl: "apps/Views/main.html",
            controller: "MainController"
        })

    .when("/Kategori", {
        templateUrl: "apps/Views/Kategori.html",
        controller: "KategoriController"
    })

    .when("/Barang", {
        templateUrl: "apps/Views/Barang.html",
        controller: "BarangController"
    })

    .when("/Log", {
        templateUrl: "apps/Views/Logout.html",
        controller: "LogoutController"
    })

    .when("/Return", {
        templateUrl: "apps/Views/Return.html",
        controller: "ReturnController"
    })

    .when("/Supplier", {
        templateUrl: "apps/Views/Supplier.html",
        controller: "SupplierController"
    })

    .when("/Pembelian", {
        templateUrl: "apps/Views/Pembelian.html",
        controller: "PembelianController"
    })

    .when("/TambahPembelian", {
        templateUrl: "apps/Views/TambahPembelian.html",
        controller: "PembelianController"
    })

    .when("/HariLibur", {
        templateUrl: "apps/Views/HariLibur.html",
        controller: "HariLiburController"
    })

    .when("/Perangkat", {
        templateUrl: "apps/Views/Perangkat.html",
        controller: "PerangkatController"
    })

    .when("/StatusAbsen", {
        templateUrl: "apps/Views/StatusAbsen.html",
        controller: "StatusAbsenController"
    })

    .when("/Collies", {
        templateUrl: "apps/Views/Collies.html",
        controller: "ColliesController"
    })

    .otherwise({ redirectTo: '/Main' })

})


.factory("SessionService", function($http, $rootScope) {
    var service = {};
    $rootScope.Session = {};
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


    return service;
})

;