<?php 
function send_message($to, $email, $subject, $message){
  
    $headers = array(
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion()
    );

    return mail($to, $subject, $message, $headers);
}