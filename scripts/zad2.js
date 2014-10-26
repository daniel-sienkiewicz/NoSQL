print("Ilość unikalnych miast:");
print(db.samoloty.distinct("DEST_CITY_NAME").length);

print("Liczba lotów, których odległość była większa niż 2500 km:");
print(db.samoloty.find({$where : "(this.DISTANCE >= 2500)"}).count());

print("Najdalszy lot:");
print(db.samoloty.find().sort({DISTANCE : -1}).limit(1));

print("Najczęstsze miasto");
samoloty = db.samoloty.find();

var destination = {};

samoloty.forEach(function(samolot) {
	if ( typeof destination[samolot.DEST_CITY_NAME] === "undefined") {
		destination[samolot.DEST_CITY_NAME] = 1;
	} else {
		destination[samolot.DEST_CITY_NAME] += 1;
	}
});

var max = 0;
var ky;
for (var key in destination) {
    if(destination[key] > max)
        ky = key;
}
print(ky + ": " + destination[ky]);
