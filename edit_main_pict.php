<?php
// на какие данные рассчитан этот скрипт
header("Content-Type: application/json");
// разбираем JSON-строку на составляющие встроенной командой
$data = json_decode(file_get_contents("php://input"));

$document_root = $_SERVER['DOCUMENT_ROOT'];
$fileText = fopen("$document_root/assets/text/nameFiles.txt", w);
fwrite($fileText, $data);
fclose($fileText);