trains = db.train.find();

var unik = {};
var all = 0;

trains.forEach(function(train){
    var tags = [];

    if(typeof train.tags === "string") {
        tags = train.tags.split(" "); 
        db.train.update({_id: train._id}, {$set: {tags: tags}});
    }
    else if(typeof train.tags === "number") {
        tags.push(train.tags.toString());
        db.train.update({_id: train._id}, {$set: {tags: tags}});
    } else {
        tags = train.tags;
    }

    all += tags.length;

    tags.forEach(function(tag) {
        if(typeof unik[tag] === "undefined") 
            unik[tag] = 1;
        else{
            unik[tag] += 1;
        }
    });
});

print("Min wystapien:");
for (var key in unik) {
    if(unik[key] == 1)
        print(key);
}

print("Wszystkie: " + all);
print("Unikalne: " + Object.keys(unik).length);