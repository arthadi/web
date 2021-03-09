<?php

if(sizeof($_FILES)!=0) {

    var_dump($_FILES);

    $arrKey = array_keys ($_FILES);

    foreach ($arrKey as &$value) {

        if (0 < $_FILES[$value]['error']) {
            echo 'Error: ' . $_FILES[$value]['error'] . '<br>';
        }
        elseif ($_FILES[$value]['type'] === 'image/jpeg') {
            move_uploaded_file( $_FILES[$value]['tmp_name'], 'assets/img/' . $_FILES[$value]['name'] );
        }
    }
}

