    import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
  UpdateResult,
  DeleteResult,
  ObjectLiteral,
} from 'typeorm';



export class DbRepository<T extends ObjectLiteral> {
  constructor(
    protected readonly repo: Repository<T>,
  ) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repo.findOneBy(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.repo.findBy(where);
  }
  getQueryBuilder(alias: string) {
  return this.repo.createQueryBuilder(alias);
}
  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repo.create(data);
    return this.repo.save(entities);
  }


  async update(
    where: FindOptionsWhere<T>,
    data: Partial<T>,
  ): Promise<UpdateResult> {
    return this.repo.update(where, data);
  }

  async updateAndReturn(
    where: FindOptionsWhere<T>,
    data: Partial<T>,
  ): Promise<T | null> {
    await this.repo.update(where, data);
    return this.repo.findOneBy(where);
  }

  async delete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repo.delete(where);
  }
}
