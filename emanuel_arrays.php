<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Array Uebung</title>
</head>
<body>
  
<h3>easy</h3>

<?php

$cars = ["Volvo", "BMW", "Toyota"];
for ($i = 0; $i < count($cars); $i++) {
  echo $cars[$i] . "<br>\n";
}

?>

<h3>multi</h3>

<?php

$cars = [
    ["name"=>"Volvo", "wheels"=>2.5], 
    ["name"=>"BMW", "wheels"=>3], 
    ["name"=>"Toyota", "wheels"=>4]
];
for ($i = 0; $i < count($cars); $i++) {
  echo $cars[$i]["name"] . " => " . $cars[$i]["wheels"] . "<br>\n";
}

?>

</body>
</html>