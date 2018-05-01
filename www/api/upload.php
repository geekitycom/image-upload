<?php
require __DIR__ . "/getallheaders.php";
$headers = getallheaders();

if (isset($headers['Origin'])) {
    header("Access-Control-Allow-Origin: " . $headers['Origin']);
}
if (isset($headers['Access-Control-Request-Method'])) {
    header("Access-Control-Allow-Methods: " . $headers['Access-Control-Request-Method']);
}
if (isset($headers['Access-Control-Request-Headers'])) {
    header("Access-Control-Allow-Headers: " . strtoupper($headers['Access-Control-Request-Headers']));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($_FILES);
}
