<?php
/**
 * Created by PhpStorm.
 * User: artha
 * Date: 20.02.2021
 * Time: 21:58
 */
header("Content-Type: application/json");
// разбираем JSON-строку на составляющие встроенной командой
$data = json_decode(file_get_contents("php://input"));

$document_root = $_SERVER['DOCUMENT_ROOT'];
$fileText = fopen("$document_root/assets/text/1.txt", w);
fwrite($fileText, $data);
fclose($fileText);