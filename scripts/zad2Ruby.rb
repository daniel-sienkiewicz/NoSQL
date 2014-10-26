#!/usr/bin/env ruby

require 'rubygems'
require 'mongo'
require 'colorize'

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

puts "Ilość unikalnych miast:"
puts cli.distinct(:DEST_CITY_NAME).count()

puts "Liczba lotów, których odległość była większa niż 2500 km:"
puts cli.find(:DISTANCE => {"$gt" => 2500}).count()

puts "Najdalszy lot:"
puts cli.find().sort({"DISTANCE" => -1}).limit(1).first()["DISTANCE"]

puts "Najczęstsze miasto:"
