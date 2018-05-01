<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($_FILES);
}
