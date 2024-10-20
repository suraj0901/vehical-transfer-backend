import { Repository } from 'typeorm';

export class QueryParams {
  search?: string;
  filter?: string; // format: "field:value1|value2,field2:value3|value4"
  sort?: string; // format: "field:asc"
  page?: number;
  limit?: number;
}
interface SearchOptions<T> {
  repository: Repository<T>;
  searchFields: string[];
  filterFields: string[];
  sortFields: string[];
}

export async function searchAndFilter<T>(
  options: SearchOptions<T>,
  queryParams: QueryParams,
): Promise<[T[], number]> {
  const { repository, searchFields, filterFields, sortFields } = options;

  const { search, filter, sort, page = 1, limit = 10 } = queryParams;

  const queryBuilder = repository.createQueryBuilder('entity');

  // Apply search
  if (search) {
    const conditions = searchFields.map(
      (field) => `LOWER(entity.${field}) LIKE LOWER(:search)`,
    );
    queryBuilder.andWhere(`(${conditions.join(' OR ')})`, {
      search: `%${search}%`,
    });
  }

  // Apply filters
  if (filter) {
    const filters = filter.split(',').map((f) => {
      const [field, values] = f.split(':');
      return [field, values.split('|')] as [string, string[]];
    });

    filters.forEach(([field, values]) => {
      if (filterFields.includes(field)) {
        queryBuilder.andWhere(`entity.${field} IN (:...${field})`, {
          [field]: values,
        });
      }
    });
  }

  // Apply sorting
  if (sort) {
    const [field, order] = sort.split(':');
    if (sortFields.includes(field)) {
      queryBuilder.orderBy(
        `entity.${field}`,
        order.toUpperCase() as 'ASC' | 'DESC',
      );
    }
  }

  // Pagination
  const skip = (page - 1) * limit;
  queryBuilder.skip(skip).take(limit);

  return queryBuilder.getManyAndCount();
}
