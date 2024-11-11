import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class RssInformation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'user_name',
    length: 50,
    nullable: false,
  })
  userName: string;

  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'rss_url',
    length: 255,
    nullable: false,
    unique: true,
  })
  rssURL: string;
}

@Entity({
  name: 'rss',
})
export class Rss extends RssInformation {}
