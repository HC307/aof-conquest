import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntity } from '../../domain/model/base-entity.interface';

export interface CompendiumConfig<T extends BaseEntity> {
  title: string;
  entityName: string;
  displayComponent: Type<any>;
  selector: (filter: string) => Observable<T[]>;
  emptyMessage: string;
  canAdd?: boolean;
  createNew?: () => Partial<T>;
  onAdd?: (entity: T) => void;
}