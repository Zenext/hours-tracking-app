defmodule Hours.Record do
  use Hours.Web, :model

  schema "records" do
    field :person_id, :integer
    field :game_id, :integer
    field :hours, :integer
    field :work_type, :string
    field :date, :string   

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
