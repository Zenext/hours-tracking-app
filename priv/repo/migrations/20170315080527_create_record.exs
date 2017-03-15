defmodule Hours.Repo.Migrations.CreateRecord do
  use Ecto.Migration

  def change do
    create table(:records) do
      add :game_id, references(:games, type: :integer)
      add :hours, :integer
      add :work_type, :string
      add :date, :date

      timestamps
    end

    create index(:records, [:game_id])
  end
end