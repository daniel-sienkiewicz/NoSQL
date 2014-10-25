#!/usr/bin/env ruby

require 'rubygems'
require 'mongo'
require 'colorize'

if ARGV.size != 2
  puts "USAGE: ruby #{$0} db collection".red
  exit(1)
else
  db = ARGV[0].to_s
  collection = ARGV[1].to_s
end

puts "db: #{db}, collection: #{collection}".green

include Mongo
cli = MongoClient.new.db(db).collection(collection);

puts "Ilość unikalnych miast:"

puts cli.distinct(:ORIGIN_CITY_NAME).count();
#cli.find.to_a.().uniq{|x| x.ORIGIN_CITY_NAME}
#cli.find.each do |doc|
#  puts doc["_id"]
#end