import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'email',
  timestamps: false,
})
export class EmailModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.BIGINT.UNSIGNED)
  id: number;

  @Unique
  @Column
  email: string;

  @CreatedAt
  @Column
  created_at: Date;

  @Column
  last_verified_at: Date;
}
