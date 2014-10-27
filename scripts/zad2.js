print("1. Ilość unikalnych miast:");
print(db.samoloty.distinct("DEST_CITY_NAME").length);

print("2. Liczba lotów, których odległość była większa niż 2500 km:");
print(db.samoloty.find({ $where : "(this.DISTANCE >= 2500)" }).count());

print("3. Najdalszy lot:");
print(db.samoloty.find().sort({ DISTANCE : -1}).limit(1)[0].DISTANCE);

print("4. Najczęstsze miasto:");
miasto = db.samoloty.aggregate([{$group : {_id: "$DEST_CITY_NAME", count: {"$sum" : 1}}}, {"$sort" : {count: -1}},{"$limit" : 1}]).toArray()[0]
print(miasto._id + " " + miasto.count);

print("5. Suma wszytskich lotów:");
print(db.samoloty.aggregate([{ $group : { _id : null, total : { $sum : "$DISTANCE" }}}]).toArray()[0].total);