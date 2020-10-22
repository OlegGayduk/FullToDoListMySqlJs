<?php

require_once("db.php");

$res = $db->query("SELECT * FROM dealsList");

if($res->num_rows > 0) {

	$i = 0;
	
	while($row = $res->fetch_assoc()) {
		$arr[$i++] = $row;
	}

	echo json_encode($arr);

} else {
	echo 0;
}

?>