defmodule Hours.Record do
  use Hours.Web, :model

  alias Hours.Record
  alias Hours.Repo
  
  import Ecto.Query, only: [from: 2]

  schema "records" do
    field :game_id, :integer
    field :hours, :integer
    field :work_type, :string
    field :date, :string   

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:game_id, :hours, :work_type, :date])
    |> validate_required([:game_id, :hours, :work_type, :date])
  end

  def get_by_game_id(id) do
    query = from r in Record, where: r.game_id == ^id

    query
    |> Repo.all
  end
end
