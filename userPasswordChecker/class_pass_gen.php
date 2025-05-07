<?php
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
?>