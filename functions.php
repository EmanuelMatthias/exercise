<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Funktions Experimente</title>
</head>
<body>
  
<h3>Fabinochi</h3>

<?php
function fib_iter($a, $b, $c)  {
  return $c === 0 ? $b : fib_iter($a + $b, $a, $c - 1);
};
function fib($n) {
  
  return fib_iter(1, 0, $n);
}

echo fib(11);
echo fib(11);
?>
</body>
</html>