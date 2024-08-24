export class GroupCompetence {
  public type: string = 'groupCompetences';

  constructor(
    public id: number = null,
    public competenceId: number = null,
    public competencesName: string,
    public level: number = 1,
  ) {}
}
