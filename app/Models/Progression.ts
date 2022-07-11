import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Progression extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ip: String

  @column()
  public finished: Boolean

  @column()
  public progression: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
