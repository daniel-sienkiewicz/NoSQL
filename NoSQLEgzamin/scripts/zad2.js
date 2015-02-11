var map = function() {
	this.tekst.split(" ").forEach(function(entry) {
		emit(entry, 1);
	});
	//emit(this.tekst, 1);
}
var reduce = function(key, values) {
	var res = 0;
	values.forEach(function(v) {
		res += 1
	});
	return {
		count : res
	};
}

db.wikipedia.mapReduce(map, reduce, {
	out : "countsData"
});
