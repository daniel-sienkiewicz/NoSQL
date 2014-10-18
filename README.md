# Daniel Sienkiewicz (206358) NoSQL - MongoDB

* [Komputer](#Komputer)
* [Zadanie 1a](#1a)
* [Zadanie 1b](#1b)
* [Zadanie 1c](#1c)
* [Zadanie 1e](#1e)

## Komputer
* Computer: Toshiba C650 - 1C2
* CPU: Intel® Core™ i3 CPU M 350 @ 2.27GHz × 4 
* RAM: 3,072 (2,048 + 1,024) MB, DDR3 RAM (1066 MHz)
* Disk: 320 GB, 5,400 r/min
* OS: Ubuntu 14.04 LTS x64
* Data base: MongoDB version: 2.6.4

## 1a
Zadanie 1a polega na zaimportowaniu, do systemów baz danych uruchomionych na swoim komputerze, danych z pliku Train.csv bazy:

* MongoDB
* PostgreSQL

Odp:
Przed importem należy "naprawić" plik Train.csv (za pomocą skryptu [naprawa.sh](https://github.com/henio180/NoSQL/blob/master/scripts/naprawa.sh))
~~~
$ time ./naprawa.sh Train.csv naprawionyTrain.csv
real 12m6.155s
user 0m46.461s
sys 2m8.678s
~~~

Następnie import pliku
~~~
$ time mongoimport -c train --type csv --file /media/Data/naprawionyTrain.csv  --headerline --dbpath /home/henio/mongodata/
real 8m15.141s
user 3m58.573s
sys 0m22.813s
~~~

Pamięć orac CPU:

![Memory & CPU](images/import.png)

![Memory & CPU](images/import2.png)

## 1b
Zliczyć liczbę zaimportowanych rekordów (Odpowiedź: powinno ich być 6_034_195).

Odp:
~~~
> db.train.count()
6034195

real 0m0.067s
user 0m0.059s
sys 0m0.008s
~~~

## 1c
(Zamiana formatu danych.) Zamienić string zawierający tagi na tablicę napisów z tagami następnie zliczyć wszystkie tagi i wszystkie różne tagi.

W tym zadaniu należy napisać program, który to zrobi. W przypadku MongoDB należy użyć jednego ze sterowników ze  strony MongoDB Ecosystem. W przypadku PostgreSQL – należy to zrobić w jakikolwiek sposób.

Odp: Wszystkie oraz unikale tagi są zliczane przez skrypt napisany w języku JavaScript ([tags.js](https://github.com/henio180/NoSQL/blob/master/scripts/tags.js))
~~~
$ time mongo scripts/tags.js

Wszystkie: 17409994
Unikalne: 42048

real 100m53.022s
user 59m35.977s
sys 4m22.558s
~~~

Przykłady tagów, które wystąpiły tylko RAZ:
~~~
*qset
*cportlet
*django-inlinecss
*jaegermonkey
*qdbusxml2cpp
*imapclient
*flexclone
*cftree
*fpcunit
*journald
*regex-injection
*alsolanguage
*lsusb
*multi-focal
*pm-utils
*false-flag
*candelight
*distributed-storage
~~~

Przed zmianą:
~~~
> db.train.findOne()
{
	"_id" : 1,
	"title" : "How to check if an uploaded file is an image without mime type?",
	"body" : "<p>I'd like to check if an uploaded file is an image file (e.g png, jpg, jpeg, gif, bmp) or another file. The problem is that I'm using Uploadify to upload the files, which changes the mime type and gives a 'text/octal' or something as the mime type, no matter which file type you upload.</p>  <p>Is there a way to check if the uploaded file is an image apart from checking the file extension using PHP?</p> ",
	"tags" : "php image-processing file-upload upload mime-types
}
~~~

Po zmianie:
~~~
> db.train.findOne()
{
	"_id" : 1,
	"title" : "How to check if an uploaded file is an image without mime type?",
	"body" : "<p>I'd like to check if an uploaded file is an image file (e.g png, jpg, jpeg, gif, bmp) or another file. The problem is that I'm using Uploadify to upload the files, which changes the mime type and gives a 'text/octal' or something as the mime type, no matter which file type you upload.</p>  <p>Is there a way to check if the uploaded file is an image apart from checking the file extension using PHP?</p> ",
	"tags" : [
		"php",
		"image-processing",
		"file-upload",
		"upload",
		"mime-types"
	]
}
~~~

Pamięć orac CPU:

![Memory & CPU](images/naprawianie.png)

![Memory & CPU](images/naprawianie2.png)

## 1e
Wyszukać w sieci dane zawierające obiekty GeoJSON. Następnie dane zapisać w bazie MongoDB.

Dla zapisanych danych przygotować co najmniej 6 różnych geospatial queries (w tym, co najmniej po jednym, dla obiektów Point, LineString i Polygon).

Odp: Mapa opisana za pomocą GEOJSON znajduje się w pliku [mapa.geojson](https://github.com/henio180/NoSQL/blob/master/mapa.geojson). Pokazuje ona miejsca, które zwiedziłem.

![Mapa](images/mapa_all.png)

~~~
$ time mongoimport -db mapa --collection map < mapa.json 
connected to: 127.0.0.1
2014-10-18T12:59:28.818+0200 check 9 50
2014-10-18T12:59:28.818+0200 imported 50 objects

real	0m0.117s
user	0m0.008s
sys	0m0.019s
~~~

Geospitale:

~~~
> db.map.find( { loc : { $geoWithin : { $polygon : [[ 15.62530517578125, 51.60266574567799 ], [ 16.2322998046875, 51.84765608216451 ], [ 16.8365478515625, 51.49677467073002 ], [ 15.836791992187498, 51.15867686442365 ], [ 15.62530517578125, 51.60266574567799 ]]}}})

{ "_id" : ObjectId("5442a726523687b8da3e0b88"), "loc" : { "type" : "Point", "coordinates" : [ 16.068878173828125, 51.50190410761811 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b89"), "loc" : { "type" : "Point", "coordinates" : [ 16.200714111328125, 51.394064665922045 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b8b"), "loc" : { "type" : "Point", "coordinates" : [ 15.893096923828125, 51.4171945605445 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b8c"), "loc" : { "type" : "Point", "coordinates" : [ 15.77911376953125, 51.53096001302977 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b8d"), "loc" : { "type" : "Point", "coordinates" : [ 16.431427001953125, 51.415481636209535 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b8e"), "loc" : { "type" : "Point", "coordinates" : [ 16.224746704101562, 51.50147667659363 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0ba8"), "loc" : { "type" : "Point", "coordinates" : [ 16.08123779296875, 51.66488962182642 ] } }
~~~

[Wynik](1e_1.geojson):
![Mapa](images/mapa_1.png)

~~~
> db.map.find( { loc : { $geoWithin : { $polygon : [[ 17.742919921875, 54.97446103959508 ], [ 19.05029296875, 54.892405720815276 ], [ 19.0118408203125, 54.0690593387285 ], [ 17.127685546875, 54.02713344412544 ], [ 17.742919921875, 54.97446103959508 ]]}}})

{ "_id" : ObjectId("5442a726523687b8da3e0b95"), "loc" : { "type" : "Point", "coordinates" : [ 18.65478515625, 54.34374993587144 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b96"), "loc" : { "type" : "Point", "coordinates" : [ 18.80859375, 54.61661705439048 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0b97"), "loc" : { "type" : "Point", "coordinates" : [ 18.31146240234375, 54.826007999094955 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb0"), "loc" : { "type" : "Point", "coordinates" : [ 18.244857788085938, 54.60667587855266 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb1"), "loc" : { "type" : "Point", "coordinates" : [ 18.56689453125, 54.44049878413806 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb2"), "loc" : { "type" : "Point", "coordinates" : [ 18.538742065429684, 54.51271147912779 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb3"), "loc" : { "type" : "Point", "coordinates" : [ 18.408966064453125, 54.796726693981796 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb4"), "loc" : { "type" : "Point", "coordinates" : [ 18.21121215820312, 54.83194081210015 ] } }
{ "_id" : ObjectId("5442a726523687b8da3e0bb5"), "loc" : { "type" : "Point", "coordinates" : [ 18.41033935546875, 54.72045628479659 ] } }
~~~

[Wynik](1e_1.geojson):
![Mapa](images/mapa_2.png)