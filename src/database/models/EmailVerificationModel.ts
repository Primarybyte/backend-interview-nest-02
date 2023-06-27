import {
  AutoIncrement,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EmailModel } from './EmailModel';

@Table({
  tableName: 'email_verification',
  timestamps: false,
})
export class EmailVerificationModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.BIGINT.UNSIGNED)
  id: number;

  @ForeignKey(() => EmailModel)
  @Column(DataTypes.BIGINT.UNSIGNED)
  email_id: number;

  @CreatedAt
  @Column
  created_at: Date;

  @Column
  result: 'valid' | 'unknown' | 'invalid';

  @Column
  is_private: boolean;

  @Column
  is_catchall: boolean;

  @Column
  is_disposable: boolean;

  @Column
  is_freemail: boolean;

  @Column
  is_rolebased: boolean;

  @Column
  is_dns_valid: boolean;

  @Column
  is_dns_valid_mx: boolean;

  @Column
  is_smtp_valid: boolean;
}
