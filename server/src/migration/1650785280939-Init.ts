import { MigrationInterface, QueryRunner } from 'typeorm';

const initialData = [
  {
    line1: 'Massachusetts Hall',
    city: 'Cambridge',
    state: 'MA',
    zip: '02138',
  },
  {
    line1: '3400 N. Charles St.',
    city: 'Baltimore',
    state: 'MD',
    zip: '21218',
  },
  {
    line1: 'Roosevelt Way NE',
    city: 'Seattle',
    state: 'WA',
    zip: '98115',
  },
  {
    line1: '1600 Holloway Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94132',
  },
  {
    line1: '1600 Holloway Ave',
    line2: 'Suite 10',
    city: 'San Francisco',
    state: 'CA',
    zip: '94132',
  },
  {
    line1: '1600 Holloway Ave',
    line2: 'Suite 20',
    city: 'San Francisco',
    state: 'CA',
    zip: '94132',
  },
  {
    line1: '500 S State St',
    city: 'Ann Arbor',
    state: 'MI',
    zip: '48109',
  },
  {
    line1: '185 Berry St',
    line2: 'Suite 6100',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
  },
];

export class Init1650785280939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'CREATE TABLE `address` (`id` int NOT NULL AUTO_INCREMENT, `line1` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `zip` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    for (const d of initialData) {
      queryRunner.query(
        `INSERT INTO address(line1, city, state, zip) VALUES ('${d.line1}', '${d.city}', '${d.state}', '${d.zip}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Address');
  }
}
