<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>For Uebung</title>
</head>
<body style="padding:20px;">

<h1>FOR Uebung</h1>

<h3>Aufgabe 1</h3>

<table><!-- style="border-collapse: collapse;"> -->
<?php
for ( $i = 1; $i <= 20; $i++) {
  echo (!(($i-1) % 5 ))?"\t<tr>\n":"";
  echo "\t\t<td";
  // echo " style=\"border: 1px solid black; text-align:right;\"";
  echo ">$i</td>\n";
  echo (!($i % 5 ))?"\t</tr>\n":"";
}
echo (($i-1) % 5 )?"\t</tr>\n":"";
?>
</table>
<br>
<h3>Aufgabe 2</h3>

<?php
$sum = 0;
for($i=1;$i<=10;$i++){
  if(!($i%2)) 
    $sum += $i;
}
echo "Summe: $sum<br>\n";
?>

oder:<br>

<?php
$sum = 0;
for($i=2;$i<=10;$i+=2){
  $sum += $i;
}
echo "Summe: $sum<br>\n";
?>
<br>
<h3>Aufgabe 3</h3>

<table>
<?php
$dim = 4;
for ( $i = 1; $i <= $dim**2; $i++) {
  echo (!(($i-1) % $dim ))?"\t<tr>\n":"";
  echo "\t\t<td>";
  echo (ceil($i/$dim) % 2) ? "X" : "O";
  echo "</td>\n";
  echo (!($i % $dim ))?"\t</tr>\n":"";
}
?>
</table>
</body>
</html>