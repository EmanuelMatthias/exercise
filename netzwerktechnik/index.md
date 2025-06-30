|      |PC |Switch|Hub|Router|
|------|---|------|---|------|
|PC    |C/O|1:1   |1:1|C/O   |
|Switch|1:1|C/O   |C/O|1:1   |
|Hub   |1:1|C/O   |C/O|1:1   |
|Router|C/O|1:1   |1:1|C/O   |

Jürgen Luchmann luchmann@bbq.de
- it eigenschaft
    - neugier
    - demut
### interessante Links
- http://ralf-pohlmann.de/
- https://kohnlehome.de/
- https://www.netacad.com/
- https://www.computerweekly.com/de/feature/IEEE-802-Die-Netzwerkstandards-im-Ueberblick

### verwendete software/hardware
- pakettracer (simulation)
- wireshark
- "echt" geräte
- GNS3 (Virtualisierung)

||||
|-|-|-|
|NIC| Network Interface Card||
|LAN| Local Area Network||
|WAN| Wide Area Network||
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
|VLAN|Virtuelles LAN|
|VTY|Virtual Teletype (Terminale)|
|SVI||
|CLI|Command Line Interface|
|RS232|Serielles Computer Interface|
|IETF|Internet Enineering Task Force|

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
- PAN, LAN, CAN, MAN, WAN, GAN, AS
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



### weitere
interface vlan 1  
    ip address 1.1.1.1 255.255.255.0
    no shutdown
no ip domain-lookup  
ip default-gateway 1.1.1.254  
ntp server 1.2.3.4


### sync clock
#### server
ip setzen 1.1.1.10 255.255.255.0  
ntp-service: on  

#### Switch
interface vlan 1
    ip address 1.1.1.1 255.255.255.0
    no shutdown
ntp server 1.1.1.10
show ntp status
show clock

## Standard-Organisationen
|||
|-|-|
|ISO|International Organization for Standardization|
|TIA/EIA|Telecommunications Industry Association/Electronic Industries Association |
|ITU|International Telecommunication Union|
|ANSI|American National Standards Institute|
|IEEE|Institute of Electrical and Electronics Engineers|
|FCC|Federal Communication Commission|
|ETSI|European Telecommunications Standards Institute|
|CSA |Canadian Standards Association|
|CENELEC |Europäisches Komitee für elektrotechnische Normung|
|JSA/JIS |Japanese Standards Association|

## Bitübertragungsschicht
### Begrifflichkeiten
- LED
- OFS (Laser) Oberflächen Strahler
- https://www.gbic-shop.de/media/image/storage/opc/what-is-the-difference-between-singlemode-and-multimode-fiber/what-is-the-difference-between-singlemode-and-multimode-fiber-2.jpg
- T568 A/B
-------------

- Physische Komponenten
- Kodierung
- Signalisierung


- 802.2-Frame (LLC Frame)
    - 802.3 Frame => Draht-Ethernet
    - 802.11 Frame => WI-FI
    - 802.4 Token-Ring Frame => Token-Ring Bus

### Glasfasermedien
- SMF
- MMF

### Interfaces
||||
|-|-|-|
|ethernet|eth0/0|10Mbit/s|
|fastethernet|fa0/0|(10)100MBit/s|
|gigabitethernet (1000MBitEthernet)|gi0/0|(10/100/)1000MBit/s|
|tengigabitethernet|te0/0|(1000)10_000MBit/s|

### Portbezeichnung
||typ|gerätenr.|modulbr.|interfacenr. im modul|
|-|-|-|-|-|
|g0/0|g|-|0|0|
|g1/0/1|g|1|0|1|


## Sicherungsschicht (data-link-layer)
### Unterschichten
- Logical Link Control (LLC)
- Mcedia Access Control (MAC)
### Standards und Protokolle der TCP/IP 
- Institute of Electrical and Electronics Engineers (IEEE)
- International Telecommunication Union (ITU)
- International Organization for Standardization (ISO)
- American National Standards Institute (ANSI)
### Konfliktbasierter Zugriff
- CSMA/CD Carrier Sense Multiple Access/Collision Detection
  (Kollisionserkennung)
  - Leitung besetzt, ich warte
- CSMA/CA Carrier Sense Multiple Access/Collision Avoidance
  (Kollisionsvermeidung)
  - via Zeit

### LLC
TYP | Payload <- Ethernet II
Länge | SSAP | DSAP | CTR | Payload <- 802.3 (SAP)
Länge | 0xAA | 0xAA | CTR | OUT | Service | Payload <- 802.3 (NSAP)

### Begriffe 2
- Broadcast Domäne
- Kollisons Domäne
- store and forward
    - gesamten Frame empfange
        - CRC kontrollieren
        - weiterleiten
- cut through
    - MAC empfangen
        - Weiterleitungsentscheidung
        - weiterleiten

## vlan2 und mehr aktivieren
S(c)# vlan 2  
S(c-vlan)# exit  
S(c)# interface range fa0/1-24  
S(config-if-range)# switchport mode access  
S(config-if-range)# exit
S(c)#  interface range fa0/13-24
S(config-if-range)# switchport access vlan 2
S(config-if-range)# exit
S(c)# show vlan

s(c)# interface g0/0
    switchport mode trunk




## IPv4
|||
|-|-|
|0.x.x.x|reserviert|
|1.x.x.x||
|...|unicast|
|223.x.x.x||
|224.x.x.x|multicast|
|240.x.x.x|reserviert|

|||
|-|-|
|10.x.x.x/8|private|
|169.254.x.x/16|APIPA|
|172.16.x.x/12|private|
|192.168.x.x/16|private|


1)  
172.16.33.7/24  
lan: 172.16.33.0/24  
first: 172.16.33.1/24  
last: 172.16.33.254/24  
bc: 172.16.33.255/24

2)
112.33.44.55/26  
112.33.44.0x37/26  
112.33.44.00|11 0111/26  
lan: 112.33.44.0/26  
first: 112.33.44.1/26  
last: 112.33.44.62/26  
bc: 112.33.44.63/26  

3)
47.208.240.11/20  
47.208.0xF0.11/20  
47.208.1111| 0000.11/20  
lan: 47.208.240.0/20  
first: 47.208.240.1/20  
last: 47.208.255.254/20  
bc: 47.208.255.255/20  

4)
88.44.192.30/22  
88.44.0xC0.30/22  
88.44.1100 00|00.30/22  
lan: 88.44.192.0/22  
first: 88.44.192.1/22  
last: 88.44.195.254/22  
bc: 88.44.195.255/22  

## submasken <=> cidr
255.255.192.0 <=> /18  
255.248.0.0 <=> /13  
255.255.252.0 <=> /22  
255.255.255.252 <=> /30  
255.128.0.0 <=> /9  
240.0.0.0 <=> /4  

/17 <=> 255.255.128.0  
/24 <=> 255.255.255.0  
/30 <=> 255.255.255.252  
/26 <=> 255.255.255.192  
/18 <=> 255.255.192.0  
/11 <=> 255.224.0.0  
/13 <=> 255.248.0.0  
/7 <=> 254.0.0.0  


17.33.249.144  
0x11.0x21.0xF9.0x90  

/20  
17.33.1111|1001  
lan: 17.33.240.0  
first: 17.33.240.1  
last: 17.33.255.254  
bc: 17.33.255.255  

/13  
17.0010 0|001  
lan: 17.32.0.0  
first: 17.32.0.1  
last: 17.39.255.254  
bc: 17.39.255.255  

/28  
17.33.249.1001|0000  
lan: 17.33.249.144  
first: 17.33.249.145  
last: 17.33.249.158  
bc: 17.33.249.159  

/9  
17.0|010 0001.249.144  
lan: 17.0.0.0  
first: 17.0.0.1  
last: 17.127.255.254  
bc: 17.127.255.255  

/7  
0001 000|1.33.249.144  
lan: 16.0.0.0  
first: 16.0.0.1  
last: 17.255.255.254  
bc: 17.255.255.255  