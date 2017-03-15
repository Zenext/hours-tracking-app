defmodule Hours.Game do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:game_id, :title, :start_date, :abbrevation]}
  alias Hours.{Repo, Game, Record}

  schema "games" do
    field :title, :string
    field :abbrevation, :string
    field :start_date, :date

    has_many :records, Record

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :start_date, :abbrevation])
    |> put_assoc(:records, [])
    |> validate_required([:title, :start_date, :abbrevation])
  end
  
  def by_id(query, id) do
    records = from r in Record
    game = from game in query,
      where: game.id == ^id,
      preload: [records: ^records]
  end

  def order_by_date(query) do
    records = from r in Record
    game = from game in query,
      order_by: [desc: game.start_date],
      preload: [records: ^records]
  end
end