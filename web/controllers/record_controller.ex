defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.Record

  import Record, only: [get_by_game_id: 1]

  def index(conn, %{"game_id" => game_id}) do
    records = Record.get_by_game_id(game_id)    
    
    render(conn, "index.json", records: records)
  end

  def show(conn, %{"game_id" => game_id}) do
    records = Record.get_by_game_id(game_id)    
    hours = count_hours(records)
    
    render(conn, "show.json",  hours: hours)
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

  defp count_hours(records) do
    %{
      dev: count_hours(records, "Dev"),
      art: count_hours(records, "Art"),
      qa: count_hours(records, "QA"),
      pm: count_hours(records, "PM")
    }
  end

  defp count_hours(records, type) do
    {_total, hours} = 
      records
      |> Enum.filter(fn(x) -> x.work_type == type end)
      |> Enum.map_reduce(0, fn(x, acc) -> {x.hours, x.hours + acc} end)

    hours
  end
end
