var map = function() {
	emit(this.name.split("").sort().join(""), this.name);
}
var reduce = function(key, values) {
	var res = 0;
	values.forEach(function(v) {
		res += 1
	});
	return {
		count : res,
		name: values 
	};
}

db.text8.mapReduce(map, reduce, {
	out : "mapped"
}); 