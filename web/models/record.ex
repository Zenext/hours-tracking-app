defmodule Hours.Record do
  use Hours.Web, :model

  @derive {Poison.Encoder, only: [:game_id, :hours, :work_type, :date]}
  alias Hours.{Repo, Record, Game}

  import Hours.TimexHelpers, only: [to_db_format: 1]

  schema "records" do
    field :hours, :integer
    field :work_type, :string
    field :date, :date   

    belongs_to :game, Game

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:game_id, :hours, :work_type, :date])
    |> validate_required([:game_id, :hours, :work_type, :date])
    |> validate_number(:hours, greater_than: 0, less_than: 25)
  end

  def all() do
    from r in Record, preload: [:game]
  end

  def by_game_id(query, id) do
    query
      |> where([r], r.game_id == ^id)
  end

  def by_time_interval(query, start_date, end_date) do
    start_date = to_db_format(start_date)
    end_date = to_db_format(end_date)
    
    query
      |> where([r], r.date >= ^start_date and r.date <= ^end_date)
  end
end
