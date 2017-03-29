defmodule Hours.Repo.Migrations.CreateRecord do
  use Ecto.Migration

  def change do
    create table(:records) do
      add :game_id, references(:games, on_delete: :delete_all)
      add :person_id, references(:people, on_delete: :nilify_all)
      add :hours, :float
      add :work_type, :string
      add :date, :date

      timestamps()
    end

    create index(:records, [:game_id, :person_id])
  end
end
