defmodule Hours.Repo.Migrations.CreateRecord do
  use Ecto.Migration

  def change do
    create table(:records) do
      add :person_id, :integer
      add :game_id, :integer
      add :hours, :integer
      add :work_type, :string
      add :date, :string

      timestamps
    end

  end
end
