print("1. Ilość unikalnych miast:");
print(db.samoloty.distinct("DEST_CITY_NAME").length);

print("2. Liczba lotów, których odległość była większa niż 2500 km:");
print(db.samoloty.find({ $where : "(this.DISTANCE >= 2500)" }).count());

print("3. Najdalsze loty:");
loty = db.samoloty.distinct("DISTANCE").sort(function(a, b){return b-a});
print(loty[0]);
print(loty[1]);
print(loty[2]);

print("4. Najczęstsze miasto:");
miasto = db.samoloty.aggregate([{$group : {_id: "$DEST_CITY_NAME", count: {"$sum" : 1}}}, {"$sort" : {count: -1}},{"$limit" : 3}]).toArray()
print(miasto[0]._id + " " + miasto[0].count);
print(miasto[1]._id + " " + miasto[1].count);
print(miasto[2]._id + " " + miasto[2].count);

print("5. Suma wszytskich lotów:");
print(db.samoloty.aggregate([{ $group : { _id : null, total : { $sum : "$DISTANCE" }}}]).toArray()[0].total);