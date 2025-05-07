<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Passwort Generator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .outputable, 
    .outputdiv {
      border-collapse: collapse;
      width: 100%;
      max-width: 1000px;
      margin: auto;
    }

    .outputable th,
    .outputable td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    .outputable td {
      border-color: #ccc;
    }

    .outputable tr.subheader th {
      padding: 4px;
      font-size: 0.8rem;
    }

    .outputable tr.subheader.thirdpart th {
      text-align: start;
    }

    .outputable th {
      background-color: #4CAF50;
      color: white;
    }

    .outputable td {
      background-color: #f9f9f9;
    }

    .outputable td pre {
      margin: 0;
      padding: 0;
      font-size: 1.0rem;
      color: #333;
    }
  </style>
</head>

<body>
  <?php

  /**
   * Zeichentypen für Passwort-Erzeugung.
   * 0 = lettersSmall => Kleinbuchstaben, 
   * 1 = lettersBig => Großbuchstaben, 
   * 2 = numbers => Zahlen, 
   * 3 = specials => Sonderzeichen
   */
  enum Type: int
  {
    case lettersSmall = 0;
    case lettersBig = 1;
    case numbers = 2;
    case specials = 3;
  }

  /**
   * Globale Zuordnung der Zeichen pro Typ (a–z, A–Z, 0–9, Sonderzeichen).
   */
  define('CHAR_CONTENT', [
    Type::lettersSmall->value => range('a', 'z'),
    Type::lettersBig->value => range('A', 'Z'),
    Type::numbers->value => range('0', '9'),
    Type::specials->value => array_merge(
      range('!', '/'),
      range(':', '@'),
      range('[', '`'),
      range('{', '~')
    )
  ]);

  /**
   * Generator zur Erzeugung von Passwörtern mit verteilter Zeichenauswahl.
   */
  class PasswordGenerator
  {
    private $length = 8;

    private $distribution = [];
    private $final_distribution = [];

    public function __construct()
    {
      $this->distribution = [
        Type::lettersSmall->value => 1,
        Type::lettersBig->value => 1,
        Type::numbers->value => 1,
        Type::specials->value => 1
      ];
      $this->calcDistribution();
    }
    /**
     * Analysiert ein Passwort auf enthaltene Zeichentypen.
     * @param string $pass: Das zu prüfende Passwort
     * @return string[] Treffer je Typ und Gesamtlänge
     */
    public static function getValid(string $pass): array
    {
      $decoded = htmlspecialchars_decode($pass);
      $result = [];
      $length = (String) strlen($decoded);
      $result["length"] = $length;

      // counting the types 
      $possibles = 0;
      foreach (Type::cases() as $case) {
        $chars = implode("", CHAR_CONTENT[$case->value]);
        $escaped = preg_quote($chars, "/");
        $pattern = "/[$escaped]/";

        preg_match_all($pattern, $decoded, $matches);
        $count = count($matches[0]);

        $result[$case->name] = $count;
        $result["matches"][$case->name] = (array) $matches[0];

        if ($count > 0)
          $possibles += count(CHAR_CONTENT[$case->value]);
      }

      // calculate quality
      $result["quality"] = floor(log($possibles, 2) * $length);
      return $result;
    }
    private function calcDistribution(): void
    {
      $sum = array_sum($this->distribution);
      $length = $this->length;

      $distribution = [
        Type::lettersSmall->value => floor($this->distribution[Type::lettersSmall->value] * (1 / $sum) * $length),
        Type::lettersBig->value => floor($this->distribution[Type::lettersBig->value] * (1 / $sum) * $length),
        Type::numbers->value => floor($this->distribution[Type::numbers->value] * (1 / $sum) * $length),
        Type::specials->value => floor($this->distribution[Type::specials->value] * (1 / $sum) * $length)
      ];
      while (array_sum($distribution) < $length) {
        $activeKeys = array_keys(array_filter($distribution));
        $randomType = $activeKeys[random_int(0, count($activeKeys) - 1)];
        $distribution[$randomType]++;
      }
      $this->final_distribution = $distribution;
    }
    private function createPureStructure(): array
    {
      $structure = [];
      foreach ($this->final_distribution as $key => $value) {
        for ($i = 0; $i < $value; $i++) {
          $structure[] = $key;
        }
      }
      return $structure;
    }
    private function getChar(int $type): string
    {
      $charTypesContent = CHAR_CONTENT[$type];
      $char = $charTypesContent[random_int(0, count($charTypesContent) - 1)];
      return $char;
    }
    public function setLength(int $length): void
    {
      if ($length < 8)
        throw new Exception("Length to short!");
      $this->length = $length;
      $this->calcDistribution();
    }
    public function setDistribution(array $distribution): void
    {
      if (!is_array($distribution) || empty($distribution))
        throw new Exception("Invalid distribution.");
      $this->distribution = [
        Type::lettersSmall->value => $distribution[Type::lettersSmall->value] ?? 0,
        Type::lettersBig->value => $distribution[Type::lettersBig->value] ?? 0,
        Type::numbers->value => $distribution[Type::numbers->value] ?? 0,
        Type::specials->value => $distribution[Type::specials->value] ?? 0
      ];
      $this->calcDistribution();
    }
    public function generatePassword(): string
    {
      $structure = $this->createPureStructure();
      shuffle($structure);
      $password = "";
      foreach ($structure as $type) {
        $password .= $this->getChar($type);
      }
      return htmlspecialchars($password);
    }
  }

  // pass initialization ans setting
  $passwort_1 = new PasswordGenerator();
  $passwort_1->setDistribution([
    Type::lettersSmall->value => 1,
    Type::lettersBig->value => 1,
    Type::numbers->value => 1,
    Type::specials->value => 1
  ]);

  $passwort_2 = new PasswordGenerator();
  $passwort_2->setDistribution([
    Type::lettersSmall->value => 1,
    Type::lettersBig->value => 1,
    Type::numbers->value => 1,
  ]);

  $passwort_3 = new PasswordGenerator();
  $passwort_3->setLength(20);
  $passwort_3->setDistribution([
    Type::lettersSmall->value => 5,
    Type::lettersBig->value => 9,
  ]);


  // output
  function printHtml($tag, $indentLevel)
  {
    echo str_repeat("\t", $indentLevel) . "$tag\n";
  }
  function printPassRow($pass)
  {
    $settings = PasswordGenerator::getValid($pass);
    printHtml("<tr>", 3);
    printHtml("<td>", 4);
    printHtml("<pre style=\"font-family: monospace;\">$pass</pre>", 5);
    printHtml("</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["length"] . "</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["lettersSmall"] . "</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["lettersBig"] . "</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["numbers"] . "</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["specials"] . "</td>", 4);
    printHtml("<td style=\"text-align: right\">" . $settings["quality"] . " bits</td>", 4);
    printHtml("</tr>", 3);
  }
  ;

  echo "\n";
  printHtml("<table class=\"outputable\">", 1);
  printHtml("<thead>", 2);
  printHtml("<tr>", 3);
  printHtml("<th>Passwort</th>", 4);
  printHtml("<th>Länge</th>", 4);
  printHtml("<th colspan=4>Anzahlen</th>", 4);
  printHtml("<th>Qualität</th>", 4);
  printHtml("</tr>", 3);
  printHtml("<tr class=\"subheader\">", 3);
  printHtml("<th colspan=2></th>", 4);
  printHtml("<th>Kleinbuchstaben</th>", 4);
  printHtml("<th>Großbuchstaben</th>", 4);
  printHtml("<th>Zahlen</th>", 4);
  printHtml("<th>Sonderzeichen</th>", 4);
  printHtml("<th></th>", 4);
  printHtml("</tr>", 3);
  printHtml("</thead>", 2);
  printHtml("<tbody>", 2);

  for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 2; $j++) {
      $pass = ${"passwort_$i"}->generatePassword();
      printPassRow($pass);
    }
  }

  printHtml("</tbody>", 2);
  printHtml("<thead>", 2);
  printHtml("<tr class=\"subheader thirdpart\">", 3);
  printHtml("<th colspan=7>Starkes Passwort</th>", 4);
  printHtml("</tr>", 3);
  printHtml("</thead>", 2);
  printHtml("<tbody>", 2);

  $strongPassLength = 24;
  $strongPass = new PasswordGenerator();
  $strongPass->setLength($strongPassLength);

  // $max = $strongPassLength - count(Type::cases()) -1;
  // $min = ceil(((count(Type::cases()) -1) * $max) / ($length - 1));

  // TODO hier muss noch der min  wert berechnet werden damit mindestens 1 zeichen pro typ vorhanden ist

  for ($j = 1; $j <= 5; $j++) {
    // $strongPass->setDistribution([
    //   Type::lettersSmall->value => random_int($min, $max),
    //   Type::lettersBig->value => random_int($min, $max),
    //   Type::numbers->value => random_int($min, $max),
    //   Type::specials->value => random_int($min, $max),
    // ]);
    $strongPass->setDistribution([
      Type::lettersSmall->value => random_int(3, 10),
      Type::lettersBig->value => random_int(3, 10),
      Type::numbers->value => random_int(3, 10),
      Type::specials->value => random_int(3, 10),
    ]);
    for ($i = 1; $i <= 3; $i++) {
      $pass = $strongPass->generatePassword();
      printPassRow($pass);
    }
  }
  printHtml("</tbody>", 2);
  printHtml("</table>", 1);

  // testlauf für zufallspasswort gemäß der Aufgabe
  $gen = new PasswordGenerator();
  $gen->setLength(8);


  $TrieResults = [];
  for($i=1; $i<=100;$i++){
    echo "<br>";
    printHtml("<table class=\"outputable\">", 1);
    printHtml("<thead>", 2);
    printHtml("<tr>", 3);
    printHtml("<th>Versuch</th>", 4);
    printHtml("<th>Passwort</th>", 4);
    printHtml("<th>Typen</th>", 4);
    printHtml("<th>Großbuchstaben</th>", 4);
    printHtml("<th>Zahlen</th>", 4);
    printHtml("<th>Sonderzeichen</th>", 4);
    printHtml("</tr>", 3);
    printHtml("</thead>", 2);
    printHtml("<tbody>", 2);
    $tries = 0;
    do {
      $tries++;
      $gen->setDistribution([
        Type::lettersSmall->value => 1,
        Type::lettersBig->value => random_int(0, 1),
        Type::numbers->value => random_int(0, 1),
        Type::specials->value => random_int(0, 1),
      ]);
      $pass = $gen->generatePassword();
      $valid = PasswordGenerator::getValid($pass);
      $countTypes =
        (($valid[Type::lettersBig->name] > 0) ? 1 : 0) +
        (($valid[Type::numbers->name] > 0) ? 1 : 0) +
        (($valid[Type::specials->name] > 0) ? 1 : 0);  
      $matches = (array) $valid["matches"];
      if($countTypes < 3) {
        printHtml("<tr>", 3);
        printHtml("<td>$tries</td>", 4);
        printHtml("<td>$pass</td>", 4);
        printHtml("<td>$countTypes</td>", 4);

        printHtml("<td>" . $valid[Type::lettersBig->name] . "(" . implode(",",$matches[Type::lettersBig->name]) . ")</td>", 4);
        printHtml("<td>" . $valid[Type::numbers->name] . "(" . implode(",",$matches[Type::numbers->name]) . ")</td>", 4);
        printHtml("<td>" . $valid[Type::specials->name] . "(" . implode(",",$matches[Type::specials->name]) . ")</td>", 4);

        printHtml("</tr>", 3);
      }
    } while ($countTypes < 3);
    printHtml("</tbody>", 2);
    printHtml("<tfoot>", 2);
    printHtml("<tr>", 3);
    printHtml("<td colspan=6>Gültiges Passwort nach $tries Versuchen: $pass</td>", 4);
    printHtml("</tr>", 3);
    printHtml("</tfoot>", 2);
    printHtml("</table>", 1);

    $TrieResults[] = $tries;
  }

  echo "<br>\n";
  echo "<div class=\"outputdiv\">\n";
  echo "\tVersuchsanzahl für " . count($TrieResults) . " zufallspasswörter: " . implode(", ", $TrieResults) . "<br>\n";
  echo "\tDurchschnitt: " . (array_sum($TrieResults) / count($TrieResults)) . "<br>\n";
  echo "\tMaximal: " . max($TrieResults) . "<br>\n";
  echo "\tMinimal: " . min($TrieResults) . "<br>\n";
  echo "\tStandardabweichung: " . (sqrt(array_sum(array_map(function ($x) use ($TrieResults) {
    return pow($x - (array_sum($TrieResults) / count($TrieResults)), 2);
  }, $TrieResults)) / count($TrieResults)));
  echo "</div>\n";

  ?>
</body>

</html>