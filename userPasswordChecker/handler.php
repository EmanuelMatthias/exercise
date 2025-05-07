<?php
// handler.php
include_once "./class_pass_gen.php";

$data = json_decode(file_get_contents("php://input"), true);
$result = PasswordGenerator::getValid($data["password"]);
header("Content-Type: application/json");
echo json_encode($result);