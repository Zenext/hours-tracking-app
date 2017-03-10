defmodule Hours.Record do
  use Hours.Web, :model

  alias Hours.Record
  alias Hours.Repo
  
  import Ecto.Query, only: [from: 2]

  schema "records" do
    field :game_id, :integer
    field :hours, :integer
    field :work_type, :string
    field :date, :date   

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:game_id, :hours, :work_type, :date])
    |> validate_required([:game_id, :hours, :work_type, :date])
    |> IO.inspect
  end

  def get_all(id) do
    query = from r in Record, where: r.game_id == ^id

    query |> Repo.all
  end

  def get_by_time_interval(id, start_date, end_date) do
    {:ok, start_date} = Ecto.Date.cast start_date
    {:ok, end_date} = Ecto.Date.cast end_date

    query = from r in Record,
      where: r.game_id == ^id and r.date >= ^start_date and r.date <= ^end_date

    query |> Repo.all
  end
end
