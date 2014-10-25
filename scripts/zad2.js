print("Ilość unikalnych miast: ");
db.samoloty.distinct("ORIGIN_CITY_NAME").length