defmodule Hours.Game do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:title, :start_date, :abbrevation]}

  schema "games" do
    field :title, :string
    field :abbrevation, :string
    field :start_date, :date

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :start_date, :abbrevation])
    |> validate_required([:title, :start_date, :abbrevation])
    |> IO.inspect
  end
end