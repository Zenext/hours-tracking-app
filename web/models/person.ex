defmodule Hours.Person do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:person_id, :name]}
  alias Hours.Record

  import Hours.TimexHelpers, only: [to_date: 1]

  schema "people" do
    field :name, :string
    
    has_many :records, Record, on_delete: :nilify_all

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> put_assoc(:records, [])
    |> validate_required([:name])
    |> validate_length(:name, max: 30)
  end

  def preload_records(query) do
    query
    |> join(:left, [p], r in assoc(p, :records))
    |> join(:left, [_, game], _ in assoc(game, :game))
    |> preload([_, r, g], [records: {r, game: g}])
  end

   def by_time_interval(query, start_date, end_date) do
    start_date = to_date(start_date)
    end_date = to_date(end_date)
    
    query |> where([_, r], r.date >= ^start_date and r.date <= ^end_date)
  end
end