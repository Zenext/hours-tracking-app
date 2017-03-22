defmodule Hours.Person do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:person_id, :name]}
  alias Hours.Record

  schema "people" do
    field :name, :string
    
    has_many :records, Record, on_delete: :delete_all

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> put_assoc(:records, [])
    |> validate_required([:name])
    |> validate_length(:name, max: 30)
  end
end