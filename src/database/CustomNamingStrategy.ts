import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import * as pluralize from 'pluralize';

export default class CustomNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName || pluralize.plural(snakeCase(targetName))
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName || snakeCase(propertyName))
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(pluralize.singular(relationName) + '_' + referencedColumnName)
  }

  joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string, secondPropertyName: string): string {
    return snakeCase(firstTableName + '_' + pluralize.plural(secondTableName))
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(pluralize.singular(tableName) + '_' + (columnName || propertyName));
  }
}