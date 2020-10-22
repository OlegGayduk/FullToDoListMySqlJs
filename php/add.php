<?php

require_once("db.php");

if(isset($_POST['add_text'])) {
    
	$text = htmlspecialchars($_POST['add_text']);

	if($text != "") {

        $id = 0;

        $res = $db->query("SELECT id FROM dealsList ORDER BY id DESC LIMIT 1");

        if($res->num_rows > 0) {

            $row = $res->fetch_assoc();

            $id = $row['id'];
        } 

        $res = $db->query("INSERT INTO dealsList(text,done) VALUES ('$text',0)");

        if($res != false) {
            echo json_encode(['id' => ($id + 1),'text' => $text,'done' => 0]);
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