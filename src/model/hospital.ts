import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Hospital extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated('uuid')
  public uuid: string;

  @Column()
  public hospitalCode: string;

  @Column()
  public hospitalName: string;

  @Column()
  public county: string;

  @Column()
  public type: string;

  @Column()
  public level: string;

  @Column({
    type: 'text'
  })
  public address: string;

  @Column({
    type: 'double',
    default: +new Date()
  })
  public createTime: number;

  @Column({
    type: 'double',
    default: +new Date()
  })
  public updateTime: number;
}
