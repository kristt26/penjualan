<?php
class Login{
 
    // database connection and table name
    private $conn;
    private $table_name = "karyawan";
 
    // object properties
    public $IdKaryawan;
    public $Nama;
    public $Alamat;
    public $Kontak;
    public $Sex;
    public $Email;
    public $Password;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    //Session Check
    function CheckSession()
    {
        session_start();
        if(!isset($_SESSION['Email']))
        {
            return false;
        }else{
            return $_SESSION;
        }
    }
    

    //login function
    function LoginUser()
    {
        $query = "SELECT p.Nip, p.Nama, p.Alamat, p.Kontak, p.Sex, b.IdBidang,b.NamaBidang, p.Jabatan, p.Email from pegawai p, bidang b where p.IdBidang=b.IdBidang and p.Email=? and p.Password=?";
        
           // prepare query statement
           $stmt = $this->conn->prepare($query);
           $stmt->bindParam(1, $this->Email);
           $stmt->bindParam(2, $this->Password);
        
           // execute query
           $stmt->execute();
        
           return $stmt;
    }

    //Logout 
    function Log()
    {
        session_start();
        session_unset();
        session_destroy();
        return true;
    }

    // read products
    function read(){
    
       // select all query
       $query = "SELECT p.Nip, p.Nama, p.Alamat, p.Kontak, p.Sex, b.IdBidang,b.NamaBidang, p.Jabatan from pegawai p, bidang b where p.IdBidang=b.IdBidang";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // execute query
       $stmt->execute();
    
       return $stmt;
    }

   // create product
    function create(){
    
       // query to insert record
       $query = "INSERT INTO
                   " . $this->table_name . "
               SET
                   Nip=:Nip, Nama=:Nama, Alamat=:Alamat, Kontak=:Kontak, Sex=:Sex, IdBidang=:IdBidang, Jabatan=:Jabatan";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->Nip=htmlspecialchars(strip_tags($this->Nip));
       $this->Nama=htmlspecialchars(strip_tags($this->Nama));
       $this->Alamat=htmlspecialchars(strip_tags($this->Alamat));
       $this->Kontak=htmlspecialchars(strip_tags($this->Kontak));
       $this->Sex=htmlspecialchars(strip_tags($this->Sex));
       $this->IdBidang=htmlspecialchars(strip_tags($this->IdBidang));
       $this->Jabatan=htmlspecialchars(strip_tags($this->Jabatan));
    
       // bind values
       $stmt->bindParam(":Nip", $this->Nip);
       $stmt->bindParam(":Nama", $this->Nama);
       $stmt->bindParam(":Alamat", $this->Alamat);
       $stmt->bindParam(":Kontak", $this->Kontak);
       $stmt->bindParam(":Sex", $this->Sex);
       $stmt->bindParam(":IdBidang", $this->IdBidang);
       $stmt->bindParam(":Jabatan", $this->Jabatan);
    
       // execute query
       if($stmt->execute()){
           return true;
       }else{
           return false;
       }
   }

   // update the product
    function update(){
    
       // update query
       $query = "UPDATE
                   " . $this->table_name . "
               SET
                    Nama=:Nama, 
                    Alamat=:Alamat, 
                    Kontak=:Kontak, 
                    Sex=:Sex, 
                    IdBidang=:IdBidang, 
                    Jabatan=:Jabatan
               WHERE
                   Nip = :Nip";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->Nip=htmlspecialchars(strip_tags($this->Nip));
       $this->Nama=htmlspecialchars(strip_tags($this->Nama));
       $this->Alamat=htmlspecialchars(strip_tags($this->Alamat));
       $this->Kontak=htmlspecialchars(strip_tags($this->Kontak));
       $this->Sex=htmlspecialchars(strip_tags($this->Sex));
       $this->IdBidang=htmlspecialchars(strip_tags($this->IdBidang));
       $this->Jabatan=htmlspecialchars(strip_tags($this->Jabatan));
    
       // bind new values
       $stmt->bindParam(":Nip", $this->Nip);
       $stmt->bindParam(":Nama", $this->Nama);
       $stmt->bindParam(":Alamat", $this->Alamat);
       $stmt->bindParam(":Kontak", $this->Kontak);
       $stmt->bindParam(":Sex", $this->Sex);
       $stmt->bindParam(":IdBidang", $this->IdBidang);
       $stmt->bindParam(":Jabatan", $this->Jabatan);
    
       // execute the query
       if($stmt->execute()){
           return true;
       }else{
           return false;
       }
   }

   // delete the product
    function delete(){
    
       // delete query
       $query = "DELETE FROM " . $this->table_name . " WHERE Nip = ?";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->Nip=htmlspecialchars(strip_tags($this->Nip));
    
       // bind id of record to delete
       $stmt->bindParam(1, $this->Nip);
    
       // execute query
       if($stmt->execute()){
           return true;
       }
    
       return false;
        
   }
}