import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'decimal' })
  price!: number;
}

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const repository = dataSource.getRepository(Product);
  const count = await repository.count();

  if (count > 0) {
    console.log(`Banco já possui ${count} produtos. Seed ignorada.`);
    await dataSource.destroy();
    return;
  }

  const products: Partial<Product>[] = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Product ${i}`,
      price: Number((Math.random() * 100 + 1).toFixed(2)),
    });
  }

  await repository.save(products);
  console.log('100 produtos inseridos.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Erro ao rodar seed:', err);
  process.exit(1);
});
