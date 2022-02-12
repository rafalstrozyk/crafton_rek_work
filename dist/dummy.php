<?php

$pass =saveUser($_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['message']);
$pass = true;
echo $pass ? "OK": "ERROR_MESSAGE";