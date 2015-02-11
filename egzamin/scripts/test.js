var input = db.mapped.find()

input.forEach(function(cos) {
	if (cos.value.count !== undefined) {
		print(cos.value.name[0] + " " + (cos.value.count - 1))
	}
});