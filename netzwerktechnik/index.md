|      |PC |Switch|Hub|Router|
|------|---|------|---|------|
|PC    |C/O|1:1   |1:1|C/O   |
|Switch|1:1|C/O   |C/O|1:1   |
|Hub   |1:1|C/O   |C/O|1:1   |
|Router|C/O|1:1   |1:1|C/O   |

Jürgen Luchmann luchmann@bbq.de
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

## Glasfasermedien
- SMF
- MMF