defmodule Hours.Record do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:game_id, :person_id, :hours, :work_type, :date]}
  alias Hours.{Game, Person}

  import Hours.TimexHelpers, only: [to_date: 1]

  schema "records" do
    field :hours, :float
    field :work_type, :string
    field :date, :date   

    belongs_to :game, Game
    belongs_to :person, Person

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:game_id, :person_id, :hours, :work_type, :date])
    |> validate_required([:game_id, :person_id, :hours, :work_type, :date])
    |> validate_number(:hours, greater_than: 0, less_than: 25)
  end

  def preload_all(query) do
    query |> preload([:game, :person])
  end

  def set_limit(query, limit) do
    query |> limit(^limit)
  end

  def newest_first(query) do
    query |> order_by([r], desc: r.inserted_at)
  end

  def by_game_id(query, id) do
    query |> where([r], r.game_id == ^id)
  end

  def by_person_id(query, id) do
    query |> where([r], r.person_id == ^id)
  end

  def by_time_interval(query, start_date, end_date) do
    start_date = to_date(start_date)
    end_date = to_date(end_date)
    
    query |> where([r], r.date >= ^start_date and r.date <= ^end_date)
  end
end
