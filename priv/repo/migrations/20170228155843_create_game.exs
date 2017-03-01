defmodule Hours.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :title, :string
      add :start_date, :string

      timestamps
    end
  end

end
