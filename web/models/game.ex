defmodule Hours.Game do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:title, :start_date]}

  schema "games" do
    field :title, :string
    field :start_date, :string

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :start_date])
    |> validate_required([:title, :start_date])
  end
end