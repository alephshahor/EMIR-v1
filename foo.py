import csv

for line in open("C:\\Users\\Adrián Álvarez\\Documents\\Emir\\emir-rest-api\\restapi\\emir\\catalogs\\catalog1.csv").readlines():
    line = line.strip().split(',')
    print(line[0])
    print(line[1])
    print(line[2])
