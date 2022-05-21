import { Repository, database } from './repository.js'

export class RolesRepository extends Repository {
  constructor () {
    super('Role')
  }

  async checkIfRoleHasPermission (roleId, permName) {
    const perm = await database[this.model].findOne({
      where: {
        id: roleId
      },
      include: {
        model: database.Permission,
        where: {
          perm_name: permName
        }
      }
    })

    return perm != null
  }
}
