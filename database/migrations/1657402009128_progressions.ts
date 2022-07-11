import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class extends BaseSchema {
  protected tableName = 'progressions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('progression').alter({alterType:true})
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
