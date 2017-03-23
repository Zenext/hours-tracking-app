defmodule Hours.Repo.Migrations.CreateRecord do
  use Ecto.Migration

  def change do
    alter table(:records) do
      modify :hours, :float
    end
  end
end