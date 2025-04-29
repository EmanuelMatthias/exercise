<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>While Uebung</title>
</head>
<body>
  
<h1>While Uebung</h1>

<h3>Aufgabe 1</h3>

<?php
$test_number = 1234;
$result = 0;
$i = 0;

while(10**$i <= $test_number) {
  echo floor($test_number % 10**($i+1)/ 10**$i).":";
    $result += floor(($test_number % 10**($i+1)) / 10**$i);
    $i++;
}
echo "Die Quersumme von $test_number ist: $result<br>\n";
?>

<h3>Aufgabe 2</h3>

<?php
$i = 0;
while(2**++$i < 20) {}
echo "2^$i = " . 2**$i;
?>

<h3>Aufgabe 3</h3>

<?php
$number = 6;
$notaus = 1000;
echo "$number";
while($number != 1 && --$notaus > 0) {
  echo " → ";
  if(!($number % 2))
    $number = $number / 2;
  else
  $number = $number * 3 + 1;
  echo $number;
}
?>

</body>
</html>