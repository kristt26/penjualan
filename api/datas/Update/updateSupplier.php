<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../../../api/config/database.php';
include_once '../../../api/objects/Supplier.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$supplier = new Supplier($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$supplier->IdSupplier = $data->IdSupplier;
$supplier->NamaSupplier = $data->NamaSupplier;
$supplier->Telp = $data->Telp;
$supplier->Alamat = $data->Alamat;
 
 
// update the product
if($supplier->update()){
    echo '{';
        echo '"message": "Bidang was updated"';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update product"';
    echo '}';
}
?>