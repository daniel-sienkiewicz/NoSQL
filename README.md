# Daniel Sienkiewicz (206358) NoSQL - MongoDB

* [Komputer](#Komputer)
* [Zadanie 1a](#1a)
* [Zadanie 1b](#1b)
* [Zadanie 1c](#1c)
* [Zadanie 1d](#1d)
* [Zadanie 2](#2)

## Komputer
* Computer: Toshiba C650 - 1C2
* CPU: Intel® Core™ i3 CPU M 350 @ 2.27GHz × 4 
* RAM: 3,072 (2,048 + 1,024) MB, DDR3 RAM (1066 MHz)
* Disk: 320 GB, 5,400 r/min
* OS: Ubuntu 14.04 LTS x64
* Data base: MongoDB version: 2.6.5

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

## 1d
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

[Wynik](1d_1.geojson):
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

[Wynik](1d_2.geojson):
![Mapa](images/mapa_2.png)

~~~
> db.map.ensureIndex({"loc" : "2dsphere"})
var origin = {type: "Point", coordinates: [51.5019, 16.0689]}
> db.map.find({ loc: {$near: {$geometry: origin}} })
~~~

Wynik
~~~
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fceb"), "loc" : { "type" : "Point", "coordinates" : [ 19.955291748046875, 49.29199347427707 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf6"), "loc" : { "type" : "Point", "coordinates" : [ 20.065155029296875, 49.98037086399746 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcec"), "loc" : { "type" : "Point", "coordinates" : [ 19.94842529296875, 50.055375373800004 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fced"), "loc" : { "type" : "Point", "coordinates" : [ 19.06951904296875, 49.829124584847854 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf5"), "loc" : { "type" : "Point", "coordinates" : [ 19.241180419921875, 50.04302974380058 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce3"), "loc" : { "type" : "Point", "coordinates" : [ 21.02783203125, 52.24125614966341 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcfe"), "loc" : { "type" : "Point", "coordinates" : [ 21.595001220703125, 53.0816522833116 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcea"), "loc" : { "type" : "Point", "coordinates" : [ 17.04254150390625, 51.11386850819646 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcfc"), "loc" : { "type" : "Point", "coordinates" : [ 17.049407958984375, 51.303145259199056 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf9"), "loc" : { "type" : "Point", "coordinates" : [ 16.195220947265625, 51.054344119247425 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcee"), "loc" : { "type" : "Point", "coordinates" : [ 15.838165283203125, 50.79551936692376 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcef"), "loc" : { "type" : "Point", "coordinates" : [ 15.761260986328123, 50.77750399573788 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcfb"), "loc" : { "type" : "Point", "coordinates" : [ 15.605392456054686, 50.723850912487684 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcd9"), "loc" : { "type" : "Point", "coordinates" : [ 16.171875, 51.19827878319755 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcdc"), "loc" : { "type" : "Point", "coordinates" : [ 16.431427001953125, 51.415481636209535 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcdf"), "loc" : { "type" : "Point", "coordinates" : [ 15.733795166015623, 50.90130070888041 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf0"), "loc" : { "type" : "Point", "coordinates" : [ 15.432701110839844, 50.72558962783843 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce0"), "loc" : { "type" : "Point", "coordinates" : [ 15.533294677734377, 50.834564997026845 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcd8"), "loc" : { "type" : "Point", "coordinates" : [ 16.200714111328125, 51.394064665922045 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcdd"), "loc" : { "type" : "Point", "coordinates" : [ 16.224746704101562, 51.50147667659363 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcfa"), "loc" : { "type" : "Point", "coordinates" : [ 17.60284423828125, 52.52624809700062 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce9"), "loc" : { "type" : "Point", "coordinates" : [ 16.58935546875, 51.851049381288874 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf4"), "loc" : { "type" : "Point", "coordinates" : [ 14.4580078125, 50.08886893382965 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcd7"), "loc" : { "type" : "Point", "coordinates" : [ 16.068878173828125, 51.50190410761811 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcda"), "loc" : { "type" : "Point", "coordinates" : [ 15.893096923828125, 51.4171945605445 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf7"), "loc" : { "type" : "Point", "coordinates" : [ 16.08123779296875, 51.66488962182642 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcde"), "loc" : { "type" : "Point", "coordinates" : [ 15.571746826171873, 51.26535213392538 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcdb"), "loc" : { "type" : "Point", "coordinates" : [ 15.77911376953125, 51.53096001302977 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce2"), "loc" : { "type" : "Point", "coordinates" : [ 16.9134521484375, 52.41247205962487 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf8"), "loc" : { "type" : "Point", "coordinates" : [ 16.0675048828125, 51.879882095410224 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcfd"), "loc" : { "type" : "Point", "coordinates" : [ 15.13092041015625, 51.645294049305406 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce4"), "loc" : { "type" : "Point", "coordinates" : [ 18.65478515625, 54.34374993587144 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd00"), "loc" : { "type" : "Point", "coordinates" : [ 18.56689453125, 54.44049878413806 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce5"), "loc" : { "type" : "Point", "coordinates" : [ 18.80859375, 54.61661705439048 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd01"), "loc" : { "type" : "Point", "coordinates" : [ 18.538742065429684, 54.51271147912779 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce1"), "loc" : { "type" : "Point", "coordinates" : [ 14.714813232421877, 51.9493437994359 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcff"), "loc" : { "type" : "Point", "coordinates" : [ 18.244857788085938, 54.60667587855266 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd04"), "loc" : { "type" : "Point", "coordinates" : [ 18.41033935546875, 54.72045628479659 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd02"), "loc" : { "type" : "Point", "coordinates" : [ 18.408966064453125, 54.796726693981796 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce6"), "loc" : { "type" : "Point", "coordinates" : [ 18.31146240234375, 54.826007999094955 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd03"), "loc" : { "type" : "Point", "coordinates" : [ 18.21121215820312, 54.83194081210015 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce7"), "loc" : { "type" : "Point", "coordinates" : [ 17.55615234375, 54.7595009150459 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd08"), "loc" : { "type" : "Point", "coordinates" : [ 15.047149658203125, 54.08356229415844 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf3"), "loc" : { "type" : "Point", "coordinates" : [ 9.173583984375, 48.777912755501845 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd07"), "loc" : { "type" : "Point", "coordinates" : [ 9.010162353515623, 48.68370757165361 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fce8"), "loc" : { "type" : "Point", "coordinates" : [ 14.271240234375, 53.89300986395707 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd06"), "loc" : { "type" : "Point", "coordinates" : [ 10.543441772460938, 52.16171821254618 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fd05"), "loc" : { "type" : "Point", "coordinates" : [ 10.53314208984375, 52.26311463698559 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf2"), "loc" : { "type" : "Point", "coordinates" : [ 9.7613525390625, 52.3755991766591 ] } }
{ "_id" : ObjectId("544bdbc5c3b92a36a1b1fcf1"), "loc" : { "type" : "Point", "coordinates" : [ 10.0030517578125, 53.54030739150022 ] } }
~~~

Wszystkie miasta w promieniu 45° od Bielska-Białęj włącznie.
~~~
>db.map.find({loc: {$geoWithin: {$center: [[49.9804, 20.0652], 45]}}})
{ "_id" : ObjectId("544bf2506211523c4675948d"), "loc" : { "type" : "Point", "coordinates" : [ 21.02783203125, 52.24125614966341 ] } }
{ "_id" : ObjectId("544bf2506211523c46759495"), "loc" : { "type" : "Point", "coordinates" : [ 19.955291748046875, 49.29199347427707 ] } }
{ "_id" : ObjectId("544bf2506211523c46759496"), "loc" : { "type" : "Point", "coordinates" : [ 19.94842529296875, 50.055375373800004 ] } }
{ "_id" : ObjectId("544bf2506211523c46759497"), "loc" : { "type" : "Point", "coordinates" : [ 19.06951904296875, 49.829124584847854 ] } }
{ "_id" : ObjectId("544bf2506211523c4675949f"), "loc" : { "type" : "Point", "coordinates" : [ 19.241180419921875, 50.04302974380058 ] } }
{ "_id" : ObjectId("544bf2506211523c467594a0"), "loc" : { "type" : "Point", "coordinates" : [ 20.065155029296875, 49.98037086399746 ] } }
{ "_id" : ObjectId("544bf2506211523c467594a8"), "loc" : { "type" : "Point", "coordinates" : [ 21.595001220703125, 53.0816522833116 ] } }
~~~

[Wynik](1d_3.geojson):
![Mapa](images/mapa_3.png)

##2