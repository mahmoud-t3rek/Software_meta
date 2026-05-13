    import {Repository,FindOptionsWhere,DeepPartial,UpdateResult,DeleteResult,ObjectLiteral,FindManyOptions} from 'typeorm';

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

async find(where?: FindOptionsWhere<T>): Promise<T[]> {
 return where ? this.repo.findBy(where) : this.repo.find()
  }
   async findWithOptions(options: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  async update(where: FindOptionsWhere<T>,data: Partial<T>): Promise<UpdateResult> {
    return this.repo.update(where, data);
  }


  async delete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.repo.delete(where);
  }
}
