<?php
/**
 * Created by PhpStorm.
 * User: artha
 * Date: 18.02.2021
 * Time: 21:13
 */
// на какие данные рассчитан этот скрипт
header("Content-Type: application/json");
// разбираем JSON-строку на составляющие встроенной командой
$data = json_decode(file_get_contents("php://input"));

$dir = $_SERVER['DOCUMENT_ROOT'] . "/assets/img";

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while(($file = readdir($dh)))
        {
            // Если это файл и он равен удаляемому ...
            if((is_file("$dir/$file")) && ("$dir/$file" == "$dir/$data"))
            {
                // ...удаляем его.
                unlink("$dir/$file");

                // Если файла нет по запрошенному пути, возвращаем TRUE - значит файл удалён.
                if(!file_exists($dir."/".$data)) return $s = TRUE;
            }
        }
        // Закрываем дескриптор директории.
        closedir($dh);
    }
}
