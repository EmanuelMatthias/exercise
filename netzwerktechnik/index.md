|      |PC |Switch|Hub|Router|
|------|---|------|---|------|
|PC    |C/O|1:1   |1:1|C/O   |
|Switch|1:1|C/O   |C/O|1:1   |
|Hub   |1:1|C/O   |C/O|1:1   |
|Router|C/O|1:1   |1:1|C/O   |

Jürgen Luchmann luchmann@bbq.de

### verwendete software/hardware
- pakettracer (simulation)
- wireshark
- "echt" geräte
- GNS3 (Virtualisierung)

||||
|-|-|-|
|NIC| Network Interface Card||
|LAN| Local Area Network||
|ISP| Internet Service Provider||
|SP| Service Provider||
|BPDU|||
|PDU| ||
|STP| Spanning Tree Protocol||
|LLC| Logical Link Control||
|FCS| Frame Control Sequenz ||
|ARP| Address Resolution Protocol|Findet MAC-Adresse zu IP-Adresse|
|MTU| Maximum Transmission Unit||
|TCP| Transmission Control Protocol||
|UDP| User Datagram Protocol||
|ICMP| Internet Control Message Protocol||
|CRC|||
|DHCP|Dynamic Host Configuration Protocol||
|NTP|Network Time Protocol|
|VTY|Virtual Teletype|

# OSI
- kommunikation
    - auftrag
    - transportschicht (-ebene)
    - paket

- grundsätzliche netzwerkanforderung
    - leistungsfähig
    - zuverlässig
    - erweiterbar
    - ökonomisch
    

### Kommunikation


### OSI Model
|              |                        |
|--------------|------------------------|
| Application  | Anwendung              |
| Presentation | Darstellung            |
| Session      | Sitzung                |
| Transport    | Transport              |
| Network      | Vermittlung            |
| Datalink     | Sicherungsschicht      |
| phys. Access | Bitübertragungsschicht |

|TCP/IP-Model 1|OSI|TCP/IP Mod.|
|-|-|-|
||7 Applicaion||
||6 Present.||
|4 Application|5 Session|5 Application|
|3 Transport (Segment)|4 Transport|4 Transport|
|2 Internet (Paket)|3 Network|3 Network|
|1 Network Access (Fames)|2 Datalink|2 Datalink|
||1 phys. Access|1 phys. Access|

stichwort: 
- encapsulation <-> decapsulation
- next-layer communication
- senden -> von oben nach unten
- empfänger -> von unten nach oben
- nexthop IP
- dual-stack
- payload
- DORA prinzip (DHCP)
- partial mesh / full mesh
- domäne
- broadcastdomäne
- PAN, LAN, CAN, MAN^, WAN, GAN, AS
- Bundes Post information
- AccessPort, DistibutionsSwitch

decapsulation
- zwischen Geräten
    - same-layer communication

||||
|-|-|-|
|Layer 4|TCP|UDP|
|Layer 3|IP 4|IP 6|
|Layer 2|Ethenet|Ethernet|
|Layer 1|Ehernet|Ethernet|

## Netzwerk Topologie



TCP/IP => Verbindungslos
- 

| | | |
|-|-|-|
| 1000 0000 | 0x80 | 128 |
| 1100 0000 | 0xC0 | 192 |
| 1110 0000 | 0xE0 | 224 |
| 1111 0000 | 0xF0 | 240 |

|||
|-|-|
| 0x3F |  063 |
| 0x7A |  122 |
| 0x11 |  017 |
| 0xE4 |  228 |
| 0xAA |  170 |
| 0x33 |  051 |
| 0xFF |  255 |
|  117 | 0x75 |
|  129 | 0x81 |
|  211 | 0xD3 |
|  019 | 0x13 |
|  049 | 0x31 |
|  133 | 0x85 |
|  249 | 0xF9 |

| ||||
|-|-|-|-|
|  1 | 0000 | 0 |   0 |
|  2| 0001 | 1 |  16 |
|  3 | 0010 | 2 |  32 |
|  4 | 0011 | 3 |  48 |
|  5 | 0100 | 4 |  64 |
|  6 | 0101 | 5 |  80 |
|  7 | 0110 | 6 |  96 |
|  8 | 0111 | 7 | 112 |
|  9 | 1000 | 8 | 128 |
| 10 | 1001 | 9 | 144 |
| 11 | 1010 | A | 160 |
| 12 | 1011 | B | 176 |
| 13 | 1100 | C | 192 |
| 14 | 1101 | D | 208 |
| 15 | 1110 | E | 224 |
| 16 | 1111 | F | 240 |

0100 1101 0x4D "M"
0110 1001 0x69 "i"
0111 0100 0x74 "t"
0111 0100 0x74 "t"
0110 0001 0x61 "a"
0110 0111 0x67 "g"
0111 0011 0x73 "s"
0111 0000 0x70 "p"
0110 0001 0x61 "a"
0111 0101 0x75 "u"
0111 0011 0x73 "s"
0110 0101 0x65 "e"

## Switch start
|||
|-|-|
|Strom an  ||
|->  |break (Mode-Taste)|
|Initialisierung  |Gerät geht in RMON -Mode|
|Power On Self Test||
|POST  |->|
|Bootloader  |Flash initialisieren|
|->  |->|
|IOS|im Flash (oder NVRAM)|
|- lokalisieren (File)|Konfigurationsdatei|
|- kopieren (RAM))|umbennen/löschen|
|->  |->|
|übergabe an die CPU  |booten|
|Starten IOS im RAM  ||
|->  ||
|Suchen Konfigdatei  ||
|ausführen KonfigDatei  ||
|>  ||
|Übergabe Steuerung an Konsole ||


## Switch grundkongiguration


switch>enable  
switch#configurate terminal  
switch(config)#hostname S  
[config wird hier abgekürzt]  
S(c)#username <username> privileg <0-15> secret <passwort>  
[privileg 15 = direkt login in privileg modus]
    #spanning-tree mode rapid  
    #line console 0  
[config-line einrückung beachten]  
        #exec-timeout 0  
        #logging synchronous  
        #history size 200  
        #login local  
        #password <password> [ist schlecht]  
["exit" 1 feld zurück, "end" alle felder zurück]  
S#write [copy running-config start-config]

### löschen der konfiguration:
S#delete flash:config.txt
["flash:" speicherort, "config.txt" filename ]  
S#reload
