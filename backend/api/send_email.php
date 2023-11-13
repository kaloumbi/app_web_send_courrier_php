<?php 
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
require_once("../lib/validate.php");
require_once("../lib/mail_utilities.php");

$result = [];

if(!empty($_POST)){
    $errors = checkData($_POST);
    if(empty($errors)){
        // Données valides
        $result["args"] = $_REQUEST;

        $to = "contact@espero-soft.com";
        $subject = $_REQUEST["subject"];
        $message = $_REQUEST["message"];
        $email = $_REQUEST["email"];

        $isSend = send_message($to,$email, $subject, $message);

     
        if($isSend){
            
            $success = "Message envoyé avec succès";
            // message envoyé avec succès
            $result["isSuccess"] = true;
            $result["status"] = 200;
            $result["message"] = $success;
        }else{
            // echec d'envoi de message
            $fail = "Envoi échoué, merci de réessayer";
            $result["isSuccess"] = false;
            $result["status"] = 500;
            $result["error"] = $fail;
            
        }
       
    }else{
        $result["isSuccess"] = false;
        $result["status"] = 500;
        $result["error"] = $errors;
    }
}else{
    $result["isSuccess"] = false;
    $result["status"] = 422;
    $result["error"] = "Aucune donnée n'a été fournie ";
}

$result["request_time"]  = date("d/m/Y H:i:s");

$result_json = json_encode($result);

echo $result_json;


