<?php 

function trimData ($tab){
    if(is_array($tab)){
        foreach ($tab as $key => $value) {
            $value = trim($value);
            $value = strip_tags($value);
            $tab[$key] = htmlspecialchars($value);
        }
        return $tab;
    }
}
function checkData($tab) {
    $tab = trimData($tab);
    $result = array();
    foreach ($tab as $key => $value){
        $value = trim($value);
        //GENERAL
        if($value === "" ){
            $result[$key] = "Le champs ".$key."  ne peut pas être vide";
        }

        //SPECIFIQUE  
        if($key == "message" && !isset($result[$key])){
            if(strlen($value) < 20 ){
                $result[$key] = "Le message doit faire au moins 20 caratères !";
            }
        }
        
        if($key == "email" && !isset($result[$key])){
            $model = '/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,8}$/';

            if(preg_match($model, $value) == 0){
                $result[$key] = "Le format de l'email est incorrect !";
            }
        }
        // dd/mm/yyy
       

        if($key == "subject" && !isset($result[$key])){
            if(strlen($value) < 2 ){
                $result[$key] = "Le sujet doit faire au moins 3 caratères !";
            }
        }
        if($key == "firstname" && !isset($result[$key])){
            if(strlen($value) < 2 ){
                $result[$key] = "Votre nom doit faire au moins 3 caratères !";
            }
        }
        if($key == "lastname" && !isset($result[$key])){
            if(strlen($value) < 2 ){
                $result[$key] = "Votre prénom doit faire au moins 3 caratères !";
            }
        }
    }
    return $result;

}