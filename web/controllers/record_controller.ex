defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.Record

  import Record, only: [get_by_game_id: 1]

  def index(conn, %{"game_id" => game_id}) do
    records = Record.get_by_game_id(game_id)    
    dev_hours = countDevHours(records)
    
    render(conn, "index.json", records: records)
  end

  def create(conn, params) do
    changeset = Record.changeset(%Record{}, params)

    case Repo.insert(changeset) do
      {:ok, record} ->
        conn
        |> put_status(:created)
        |> render("show.json", record: record)
      {:error, _record} ->
        render(conn, "show.json")
    end
  end

  defp countDevHours(records) do
    records
    |> Enum.filter(fn(x) -> x.work_type == "Dev" end)  
    |> Enum.reduce(fn(x, acc) -> x.hours + acc.hours end)
  end

  end
