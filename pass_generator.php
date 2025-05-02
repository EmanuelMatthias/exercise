<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Passwort Generator</title>
</head>

<body>
  <pre>

    <?php
      print_r("<br>");
      enum Type: int
      {
        case lettersSmall = 0;
        case lettersBig = 1;
        case numbers = 2;
        case specials = 3;
      }
    
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
      class PasswordGenerator
      {
        private $length = 8;

        private $distribution = [];
        private $final_distribution = [];

        public function __construct(){
          $this->distribution = [
            Type::lettersSmall->value => 1,
            Type::lettersBig->value => 1,
            Type::numbers->value => 1,
            Type::specials->value => 1
          ];
          $this->calcDistribution();
        }
        public static function getValid($pass): array{
          $decoded = htmlspecialchars_decode($pass);
          $result=[];
          $result[] = "Länge: " . strlen($decoded);
          foreach (Type::cases() as $case) {
            $chars = implode("", CHAR_CONTENT[$case->value]);
            $escaped = preg_quote($chars, "/");
            $pattern = "/[$escaped]/";

            preg_match_all($pattern, $decoded, $matches);
            $count = count($matches[0]);

            $result[] = "Anzahl {$case->name}: $count";
          }
          return $result;
        }
        private function calcDistribution():void{
          $sum = array_sum($this->distribution);
          $length = $this->length;

          $distribution = [
            Type::lettersSmall->value => floor($this->distribution[Type::lettersSmall->value] * ( 1 / $sum) * $length),
            Type::lettersBig->value => floor($this->distribution[Type::lettersBig->value] * ( 1 / $sum) * $length),
            Type::numbers->value => floor($this->distribution[Type::numbers->value] * ( 1 / $sum) * $length),
            Type::specials->value => floor($this->distribution[Type::specials->value] * ( 1 / $sum) * $length)
          ];
          while(array_sum($distribution) < $length){
            $activeKeys = array_keys(array_filter($distribution));
            $randomType = $activeKeys[random_int(0, count($activeKeys) - 1)];
            $distribution[$randomType]++;
          }
          $this->final_distribution = $distribution;
        }
        private function createPureStructure(): array{
          $structure = [];
          foreach($this->final_distribution as $key => $value){
            for($i = 0; $i < $value; $i++){
              $structure[] = $key;
            }
          }
          return $structure;
        }
        private function getChar(int $type): string{
          $charTypesContent = CHAR_CONTENT[$type];
          $char = $charTypesContent[random_int(0, count($charTypesContent) - 1)];
          return $char;
        }
        public function setLength(string $length): void{
          if ($length < 8) throw new Exception("Length to short!");
          $this->length = $length;
          $this->calcDistribution();
        }
        public function setDistribution(array $distribution): void{
          if ($distribution === 0) throw new Exception("Invalid distribution.");
          $this->distribution = [
            Type::lettersSmall->value => $distribution[Type::lettersSmall->value] ?? 0,
            Type::lettersBig->value => $distribution[Type::lettersBig->value] ?? 0,
            Type::numbers->value => $distribution[Type::numbers->value] ?? 0,
            Type::specials->value => $distribution[Type::specials->value] ?? 0
          ];
          $this->calcDistribution();
        }
        public function generatePassword(): string{
          $structure = $this->createPureStructure();
          shuffle($structure);
          $password = "";
          foreach($structure as $type){
            $password .= $this->getChar($type);
          }
          return htmlspecialchars($password);
        }
      }
      
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
        Type::lettersBig->value => 1
      ]);

      $passwort_3 = new PasswordGenerator();
      $passwort_3->setLength(20);
      $passwort_3->setDistribution([
        Type::lettersSmall->value => 1,
        Type::lettersBig->value => 1,
        Type::numbers->value => 1,
      ]);

      $passwort_4 = new PasswordGenerator();
      $passwort_4->setDistribution([
        Type::lettersSmall->value => 5,
        Type::lettersBig->value => 9
      ]);
      

      for($i=1; $i <= 4; $i++){
        print_r("passwort_$i: <br>");
        for($j=1; $j <= 4; $j++){
          $pass = ${"passwort_$i"}->generatePassword();
          print_r("\tVersion: $j: $pass<br>");
          print_r("\t\t" . implode("<br>\t\t", PasswordGenerator::getValid($pass)) . "<br>");
        }
      }

    ?>

  </pre>
</body>

</html>