import csv
from model import DeliverCount
from datetime import datetime
from db_connect import db

with open('seoul_deliver_count.csv') as file:
    reader = csv.DictReader(file)
    for row in reader:
        _date = datetime.strptime(row['date'], '%Y-%m-%d').date()
        delivery_count = DeliverCount(
            id=int(row['id']), date=_date, gu=row['gu'], dong=row['dong'], delivery_count=row['deliver_count']
        )
        db.session.add(delivery_count)
    db.session.commit()