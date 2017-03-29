defmodule Hours.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :title, :string
      add :abbrevation, :string
      add :start_date, :date

      timestamps()
    end
  end
end
