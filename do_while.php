<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Do While</title>
</head>
<body>
  
<h1>Do While Uebung</h1>

<h3>Aufgabe 1</h3><br>

<?php
$number = 1;
do {
    echo $number**2 . ", ";
    $number++;
} while ($number <= 5);
?>

<h3>Aufgabe 2</h3><br>

<?php
$i = 0;
$number_a = 0;
$number_b = 1;
$end = 5;
do {
  $next = $number_a + $number_b;
  echo $next . ", ";
  $number_a= $number_b;
  $number_b= $next;
} while (++$i < $end);
?>

<h3>Aufgabe 3</h3><br>

<?php
$i = 1;
$fakultaet = 1;
$end = 4;


do {
  $fakultaet *= ++$i;
} while ($i < $end);
echo "Fakultät von $end ist: $fakultaet<br>\n";
?>

</body>
</html>