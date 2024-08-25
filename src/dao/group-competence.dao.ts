import { Competence } from './competence.dao.ts';

export class GroupCompetence {
  public type: string = 'groupCompetences';

  constructor(
    public id: number = null,
    public competenceId: number = null,
    public competence: Competence,
    public level: number = 1,
  ) {}
}
