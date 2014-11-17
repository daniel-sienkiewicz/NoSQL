#!/usr/bin/env ruby

require 'rubygems'
require 'mongo'
require 'colorize'
require "forwardable"

#Sprawdzenie czy zostala podana nazwa bazy oraz kolekcji do polaczenia
if ARGV.size != 2
  puts "USAGE: ruby #{$0} db collection".red
  exit(1)
else
  db = ARGV[0].to_s
  collection = ARGV[1].to_s
end

puts "db: #{db}, collection: #{collection}".green

#Polaczenie do bazy mongodb
include Mongo
cli = MongoClient.new.db(db).collection(collection)

puts "1. Ilość unikalnych miast:"
puts cli.distinct(:DEST_CITY_NAME).count()

puts "2. Liczba lotów, których odległość była większa niż 2500 km:"
puts cli.find(:DISTANCE => {"$gt" => 2500}).count()

puts "3. Najdalsze loty:"
loty = cli.distinct(:DISTANCE).to_a.sort{ |x,y| y <=> x }
puts loty[0]
puts loty[1]
puts loty[2]

puts "4. Najczęstsze miasta:"
miasto = cli.aggregate([{"$group" => {_id: "$DEST_CITY_NAME", count: {"$sum" => 1}}}, {"$sort" => {count: -1}},{"$limit" => 3}])
puts "#{miasto[0]['_id']} #{miasto[0]['count']}|"
puts "#{miasto[1]['_id']} #{miasto[1]['count']}|"
puts "#{miasto[2]['_id']} #{miasto[2]['count']}|"

puts "5. Suma wszytskich lotów:"
puts cli.aggregate([{ "$group" => { _id: "null", total: { "$sum" => "$DISTANCE" }}}])[0]["total"]