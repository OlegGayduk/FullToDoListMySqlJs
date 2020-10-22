<?php

require_once("db.php");

if(isset($_POST['id'])) {
    
	$id = htmlspecialchars($_POST['id']);

	if($id != "") {

        $res = $db->query("UPDATE dealsList SET done=1 WHERE id='$id'");

        if($res != false) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	echo 0;
    }
} else {
	echo 0;
}

?>